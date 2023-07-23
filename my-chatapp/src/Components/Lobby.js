import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function Lobbhy({ joinRoom }) {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");

    const submit = (e) => {
        e.preventDefault();
        joinRoom(user, room);

    }
    return (
        <div>
            <Form className='lobby' onSubmit={submit}>
                <Form.Group>
                    <Form.Control size="lg" type="text" placeholder="name" onChange={e => { setUser(e.target.value) }} />
                    <Form.Control size="lg" type="text" placeholder="room" onChange={e => { setRoom(e.target.value) }} />
                </Form.Group>
                <Button variant='success' type='submit' disabled={!user || !room}>Submit</Button>
            </Form>
        </div>
    )
}

export default Lobbhy