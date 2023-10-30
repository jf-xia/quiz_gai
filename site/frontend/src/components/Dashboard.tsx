import { Container, Divider, Link, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import GenerationView from "@components/GenerationView";
import Upload from "@components/Upload";
import useGenerations from "@hooks/useGenerations";
import CollapsibleAlert from "./CollapsibleAlert";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { isLoading, generations } = useGenerations();

  if (isLoading) {
    return <div>Loading generations...</div>;
  }

  return (
    <Container maxW="container.lg" pt="2em">
      <CollapsibleAlert
        storageKey="introduction-message"
        title="Welcome to Quiz Generator!"
        content={
          <Stack spacing={3}>
            <Text>
              We use large language models to generate multiple-choice quizzes about educational material.
              You can use these quizzes to help your students actively engage with what they're learning. To create your first quiz, you'll need text content from any educational source: lecture notes, textbooks, etc.
              Providing lengthy content gives the model more context about what you're teaching and often results in better quizzes.
            </Text>
            <Text>
              <b>Disclaimer:</b> the generated content may be offensive or harmful. We do not endorse any output of the model, and you should carefully review ALL generated content before sharing with others.
            </Text>
          </Stack>
        }
      />

      <Upload />

      <Divider className={styles.divider} />

      {generations?.length === 0 ?
        <Text fontSize="large" mb="1em">You don't have any quizzes</Text>
        :
        <CollapsibleAlert
          storageKey="first-quiz-tutorial"
          title="Editing your quizzes"
          content={
            <Text>
              Congratulations on generating your first quiz! We provides a few utilities to help prepare your quizzes for student use:
              <UnorderedList mt="5px">
                <ListItem>
                  <b>Custom questions:</b> If your quiz is missing important content, the custom question utility will use AI to generate potential answer choices for your handwritten questions.
                </ListItem>
                <ListItem>
                  <b>Generating more questions:</b> If you need more quiz questions, the "generate more questions" utility will add a custom number of AI-generated questions to your quiz.
                </ListItem>
              </UnorderedList>
            </Text>
          }
        />  
      }

      {generations?.map((g) => (
        <GenerationView key={g} generation_id={g} />
      ))}
    </Container>
  );
}

export default Dashboard;
