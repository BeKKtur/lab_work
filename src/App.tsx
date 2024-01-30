import './App.css'
import {useEffect, useState} from "react";
import {Messages} from "./types";
import AddMessage from "./AddMessage/AddMessage";

const url = 'http://146.185.154.90:8000/messages';

function App() {
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        const request = async () => {
            const response = await fetch(url)
            if (response.ok) {
                const messages: Messages[] = await response.json()
                setMessages(messages.map(m => ({...m, datetime: new Date(m.datetime).toDateString()})))
            }
        }

        const interval = setInterval(() => {
            void request()
        }, 3e3)

        return () => {
            clearInterval(interval)
        }

    }, [])

    const messageAdded = (message: Messages) => {

        const data = new URLSearchParams();
        data.set('message', message.message);
        data.set('author', message.author);

        void fetch(url, {method: 'post', body: data,});
    }
    return (
        <>
            <div>
                <AddMessage onSubmit={messageAdded}/>
            </div>
            {messages.map(messageData => (
                <div key={messageData._id} className="messagesBlock">
                    <p>{messageData.datetime}</p>
                    <p>{messageData.author}</p>
                    <p>{messageData.message}</p>
                </div>
            )).reverse()}
        </>
    )
}

export default App
