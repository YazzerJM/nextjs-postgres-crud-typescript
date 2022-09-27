import { GetServerSideProps } from 'next'
import { Task } from 'interfaces/Task';
import { Grid, Button, GridRow, GridColumn } from "semantic-ui-react";
import { useRouter } from "next/router";
import { TaskList } from 'components/tasks/TaskList';

interface Props {
  tasks: Task[]
}

export default function IndexPage({ tasks }: Props) {

  const router = useRouter();

  return <>
    {tasks.length === 0 ? (
      <Grid columns={3} centered verticalAlign='middle' style={{height: '70%'}} >
        <GridRow>
          <GridColumn>
            <h1>No tasks yet</h1>
            <Button onClick={() => router.push('tasks/new')}>Create one</Button>
          </GridColumn>
        </GridRow>
      </Grid>
    ) : (
      <TaskList tasks={tasks} />
    )}
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();

  return {
    props: {
      tasks: tasks,
    }
  }
}
