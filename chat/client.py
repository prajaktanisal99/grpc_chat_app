import logging
import grpc
import chat_pb2
import chat_pb2_grpc
from google.protobuf.timestamp_pb2 import Timestamp

def creatingStream(stub):
    
    userId = input("Enter User ID:: ")
    name = input("Enter name:: ")
    
    
    # Create a Connect message
    newUser = chat_pb2.Connect(user=chat_pb2.User(id=userId, name=name), active=True)

    # Create a stream by calling the CreateStream RPC
    try:
        response_stream = stub.CreateStream(newUser)
        print("response_stream", response_stream)
        for message in response_stream:
            print(f"Received Message: {message.content}, Timestamp: {message.timestamp}")
    except grpc.RpcError as e:
        print(f"Error: {e}")

def sendMessage(stub):
    # Send a message
    fromUser = input("From User ID:: ")
    toUser = input("To User ID:: ")
    content = input("Message:: ")
    message = chat_pb2.Message(senderId=fromUser, receiverId=toUser, content=content, timestamp=None)
    response = stub.SendMessage(message)
    print("Message sent, response:", response)

def broadcastMessage(stub):
    timestamp = Timestamp()
    timestamp.GetCurrentTime()
    
    fromUser = input("From User ID:: ")
    msg = chat_pb2.Message(
        senderId = fromUser,
        receiverId = "",
        content = "Hello, everyone!",
        timestamp = timestamp
    )
    
    stub.BroadcastMessage(msg)
    print("Broadcast message sent.")

def run():
    print("Running client\n")
    # chat_m.hello()
    # Set up the channel and stub
    with grpc.insecure_channel("localhost:8080") as channel:
        stub = chat_pb2_grpc.ChatServiceStub(channel)

        print("Menu")
        print("1. Press 1 to join the pool")
        print("2. Press 2 to send a message")
        print("3. Press 3 to broadcast a message")
        choice = int(input("Enter your choice::"))
        if choice == 1:
            print("creating stream...")
            creatingStream(stub)
        if choice == 2:
            print("sending message...")
            sendMessage(stub)
        if choice == 3:
            print("broadcasting a message...")
            broadcastMessage(stub)

if __name__ == "__main__":  # Correct block
    # logging.basicConfig(level=logging.INFO)  # Set logging level
    run()