package main

import (
	"example/gochat/chat"
	"example/gochat/server"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	grpcServer := grpc.NewServer()

	var conn []*server.Connection

	pool := &server.Pool{
		Connections: conn,
	}

	chat.RegisterChatServiceServer(grpcServer, pool)

	// Register reflection service on gRPC server
	reflection.Register(grpcServer)

	listener, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatalf("error listening to port: %v", err)
	}

	fmt.Println("Server started at port 9090.")

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("error serving: %v", err)
	}
}
