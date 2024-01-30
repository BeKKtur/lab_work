import React, {useState} from 'react';
import {Messages, MessageValue} from "../types";

interface AddMessageProps {
    onSubmit: (message:Messages) => void
}

const AddMessage:React.FC<AddMessageProps> = ({onSubmit}) => {

    const [message, setMessage] =useState<MessageValue>({
        message: '',
        author: ''
    });

    const date = new Date()
    const RUDate = Intl.DateTimeFormat('ru')

    const onFormSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            ...message,
            _id:Math.random().toString(),
            datetime: RUDate.format(date)
        })
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="container mt-3">
            <form className="input-group mb-3" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    required
                    name="message"
                    id="message"
                    value={message.message}
                    onChange={onChange}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    required
                    name="author"
                    id="author"
                    value={message.author}
                    onChange={onChange}
                />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default AddMessage;