package server

import (
	"context"
	"example/gochat/chat"
	"fmt"
	"sync"
)

type Connection struct {
	stream chat.ChatService_CreateStreamServer
	id     string
	active bool
	error  chan error
}

type Pool struct {
	chat.UnimplementedChatServiceServer
	Connections []*Connection
	mu          sync.Mutex
}

func (p *Pool) CreateStream(pconn *chat.Connect, stream chat.ChatService_CreateStreamServer) error {

	conn := &Connection{
		stream: stream,
		id:     pconn.User.Id,
		active: true,
		error:  make(chan error),
	}

	p.mu.Lock()
	p.Connections = append(p.Connections, conn)
	p.mu.Unlock()

	return <-conn.error
}

// one to one message
func (p *Pool) SendMessage(ctx context.Context, msg *chat.Message) (*chat.Close, error) {

	p.mu.Lock()
	defer p.mu.Unlock()

	for _, conn := range p.Connections {
		if conn.id == msg.ReceiverId {
			if err := conn.stream.Send(msg); err != nil {
				return nil, err
			}
			return &chat.Close{}, nil
		}
	}
	return nil, fmt.Errorf("user not found")
}

func (p *Pool) BroadcastMessage(ctx context.Context, msg *chat.Message) (*chat.Close, error) {

	wait := sync.WaitGroup{}
	done := make(chan int)

	for _, conn := range p.Connections {
		wait.Add(1)

		go func(msg *chat.Message, conn *Connection) {
			defer wait.Done()

			if conn.active && conn.id != msg.SenderId {
				err := conn.stream.Send(msg)
				fmt.Printf("Sending message to %v -> %v\n", conn.id, msg.ReceiverId)

				if err != nil {
					fmt.Printf("Error with stream")
					conn.active = false
					conn.error <- err
				}
			}
		}(msg, conn)
	}

	go func() {
		wait.Wait()
		close(done)
	}()
	<-done
	return &chat.Close{}, nil
}
