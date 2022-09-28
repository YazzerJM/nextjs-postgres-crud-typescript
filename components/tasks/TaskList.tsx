import { Task } from "interfaces/Task"
import { Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta } from "semantic-ui-react";
import { useRouter } from "next/router";
interface Props {
  tasks: Task[];
}

export const TaskList = ({tasks}: Props) => {

  const router = useRouter();

  return (
      <CardGroup itemsPerRow={4}>
        {
          tasks.map(task => (
            <Card key={task.id} onClick={ () => router.push(`/tasks/edit/${task.id}`) }>
              <CardContent>
                <CardHeader>{ task.title }</CardHeader>
                {
                  task.created_on && (
                    <CardMeta suppressHydrationWarning>{ new Date(task.created_on).toLocaleDateString() }</CardMeta>
                  )
                }
                <CardDescription>{ task.description }</CardDescription>
              </CardContent>
            </Card>
          ))
        }
      </CardGroup>
  )
}
