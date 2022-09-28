
import { Task } from "interfaces/Task";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Button, Card, Form, FormField, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Layout } from "components/layout/Layout";



export default function NewPage() {

    const router = useRouter();

    const [task, setTask] = useState({
        title: '',
        description: ''
    });


    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const updateTask = async (id: string, task: Task) => {
        await fetch('http://localhost:3000/api/tasks/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (typeof router.query.id === 'string') {
                await updateTask(router.query.id, task);
            } else {
                await createTask(task);
            }
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const loadTask = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/tasks/' + id);
        const task = await res.json();
        setTask({ title: task.title, description: task.description });
    }

    useEffect(() => {
        if (typeof router.query.id === 'string') {
            loadTask(router.query.id);
        }
    }, [router.query.id])

    return (
        <Layout>
            <Card>
                <Card.Content>
                    <Form onSubmit={handleSubmit}>
                        <FormField>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                placeholder="Write your title"
                                name="title"
                                onChange={handleChange}
                                value={task.title}
                            />
                        </FormField>
                        <FormField>
                            <label htmlFor="title">Description:</label>
                            <textarea
                                name="description"
                                rows={2}
                                placeholder="Write your description"
                                onChange={handleChange}
                                value={task.description}
                            />
                        </FormField>
                        {
                            router.query.id ? (
                                <Button color="teal">
                                    <Icon name="save" />
                                    Update
                                </Button>
                            ) : (
                                <Button primary>
                                    <Icon name="save" />
                                    Save
                                </Button>
                            )
                        }
                    </Form>
                </Card.Content>
            </Card>

        </Layout>
    )
}
