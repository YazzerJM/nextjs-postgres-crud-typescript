
import { Task } from "interfaces/Task";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, Form, FormField, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";



export default function NewPage() {

    const router = useRouter();

    const [task, setTask] = useState({
        title: '',
        description: ''
    });


    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [name]: value,
        });
    }

    const createTask = async (task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createTask(task);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <Card>
            <Card.Content>
                <Form onSubmit={ handleSubmit }>
                    <FormField>
                        <label htmlFor="title">Title:</label>
                        <input type="text" placeholder="Write your title" name="title" onChange={ handleChange } />
                    </FormField>
                    <FormField>
                        <label htmlFor="title">Description:</label>
                        <textarea name="description" rows={2} placeholder="Write your description" onChange={ handleChange }/>
                    </FormField>
                    <Button>
                        <Icon name="save" />
                        Save
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    
    </>
  )
}
