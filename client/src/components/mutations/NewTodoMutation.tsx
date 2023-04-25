import { graphql } from "babel-plugin-relay/macro";
import { commitMutation, ConnectionHandler } from "relay-runtime";
import RelayEnvironment from "../../RelayEnvironment";

const connectionId = ConnectionHandler.getConnectionID('root', 'connection_allTodos')

const mutation = graphql`
  mutation NewTodoMutation($connections: [ID!]!, $input: CreateTaskInput!) {
    createTask(input: $input) {
      taskEdge @appendEdge(connections: $connections) {
        node {
          id
          rowId
          task
        }
      }
    }
  }
`;

const commitNewTodoMutation = (task: any, connectionId: any) => {
  return commitMutation(RelayEnvironment, {
    mutation,
    variables: {
      connections: [connectionId],
      input: {
        task: {
          task,
        },
      },
    },
    onCompleted: () => {},
    onError: () => {
      console.log("Add task mutation error");
    },
  });
};

export default commitNewTodoMutation;