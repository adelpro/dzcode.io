import "./style.scss";

import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import Divider from "@material-ui/core/Divider";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Skeleton from "@material-ui/lab/Skeleton";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Authors } from "src/components/authors";
import { Contributors } from "src/components/contributors";
import { Markdown } from "src/components/markdown";
import { SpeedDial, SpeedDialAction } from "src/components/speed-dial";
import { fetchCurrentArticle } from "src/redux/actions/articles-page";
import { useSliceSelector } from "src/redux/selectors";

const actions = ({ slug }: Article): SpeedDialAction[] => [
  {
    icon: <EditIcon />,
    name: "Edit This Article",
    link: `https://github.com/dzcode-io/dzcode.io/blob/main/data/models/articles/${slug}/content.md`,
  },
  { icon: <FileCopyIcon />, name: "Copy URL" },
  { icon: <FacebookIcon />, name: "Share to Facebook" },
  { icon: <TwitterIcon />, name: "Share to Twitter" },
  { icon: <LinkedInIcon />, name: "Share to LinkedIn" },
  { icon: <InstagramIcon />, name: "Share to Instagram" },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    heroImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
    },
    speedDial: {
      position: "fixed",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
    spacing: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

export const Content: FC = () => {
  const { currentArticle } = useSliceSelector("articlesPage");

  useEffect(() => {
    fetchCurrentArticle();
  }, []);

  const classes = useStyles();

  const ContentSkeleton = (
    <>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
      <Typography variant="h4" gutterBottom>
        <Skeleton />
      </Typography>

      {[80, 70, 40, 80, 80, 10].map((width, index) => (
        <Skeleton
          key={`ss-${index}`}
          animation={index % 2 ? "pulse" : "wave"}
          width={`${width}%`}
        />
      ))}
    </>
  );

  return (
    <>
      {currentArticle === "ERROR" ? (
        <TryAgain
          error="Ops, an error occurred while loading the selected article, please try again..."
          action="Try Again"
          onClick={() => fetchCurrentArticle()}
        />
      ) : currentArticle ? (
        <>
          <Helmet>
            <title>{`${currentArticle.title} | DzCode i/o`}</title>
            <meta name="description" content={currentArticle.description} />
          </Helmet>
          {/* Image */}
          {currentArticle.image && (
            <img
              className={classes.heroImage}
              src={currentArticle.image}
              alt={currentArticle.title}
            />
          )}
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {currentArticle.title}
          </Typography>
          {/* Description */}
          <Typography variant="caption" display="block" gutterBottom>
            {currentArticle.description}
          </Typography>
          <Divider className={classes.spacing} />
          {/* Content */}
          <Markdown>{currentArticle.content + ""}</Markdown>
          {/* Actions */}
          <SpeedDial
            className={classes.speedDial}
            ariaLabel="Actions SpeedDial"
            actions={actions(currentArticle)}
            open
          />
          <Divider className={classes.spacing} />

          {/* Authors */}
          <Authors githubAuthors={currentArticle.githubAuthors} />
          <Divider className={classes.spacing} />
          {/* Contributors */}
          <Contributors contributors={currentArticle.contributors} />
          <Divider className={classes.spacing} />
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
          <div className={classes.spacing} />
        </>
      ) : (
        ContentSkeleton
      )}
    </>
  );
};
