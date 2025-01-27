import React, { FC, memo } from "react";
import { Project } from "src/_types/project";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Paragraph } from "src/text/paragraph";
import { Title } from "src/text/title";
import { Colors } from "src/theme/style/color";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Pick<Project, "title" | "description" | "image" | "githubURI">;
  theme: "dark" | "light";
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { title, description, githubURI, image },
  theme,
  openLink,
}: ProjectCardProps) => {
  return (
    <Card style={cardStyles.mainView}>
      <Card.Cover
        height={true}
        width={true}
        source={{ uri: image }}
        style={{
          backgroundColor: theme === "dark" ? Colors.darkGrey : Colors.light,
        }}
      />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => githubURI && openLink("https://www.github.com/" + githubURI)}
          color={Colors.primary}
        >
          Go to code
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const ProjectCard = memo(CardItem);
