import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { LinkV2 } from "src/components/link-v2";
import { T } from "src/components/t";
import { useSliceSelector } from "src/redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.background.paper}`,
    padding: "30px",
    marginTop: "auto",
  },
  linkText: {
    paddingBottom: "8px",
    color: theme.palette.text.secondary,
  },
  categoryTitle: {
    paddingBottom: "12px",
  },
  contactDetails: {
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(6),
    },
  },
}));

export const Footer: FC = () => {
  const classes = useStyles();

  const { sections } = useSliceSelector("footerComponent");

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="flex-start" alignContent="stretch">
          <Grid container item xs={12} md={9} spacing={6}>
            {sections &&
              sections.map((category, i) => (
                <Grid direction="column" container item xs={12} md={4} key={i}>
                  <Typography variant="h6" className={classes.categoryTitle}>
                    <T k={category.title} />
                  </Typography>
                  {category.links.map((link, i) => {
                    return (
                      <LinkV2 key={i} href={link.href}>
                        <Typography variant="subtitle2" className={classes.linkText}>
                          <T k={link.text} />
                        </Typography>
                      </LinkV2>
                    );
                  })}
                </Grid>
              ))}
          </Grid>
          <Grid item xs={12} md={3} className={classes.contactDetails}>
            <Typography variant="h6" className={classes.categoryTitle}>
              <T footer-contact-information />
            </Typography>
            <a href="tel:+21367-626-1157">
              <Typography
                className={classes.linkText}
                style={{ direction: "ltr", display: "inline-block" }}
              >
                {"+213 06-76-26-11-57"}
              </Typography>
            </a>
            <a href="mailto:contact@dzcode.io">
              <Typography className={classes.linkText}>{"contact@dzcode.io"}</Typography>
            </a>
            <Typography className={classes.linkText}>
              <T footer-category-link-text-copyright /> {new Date().getFullYear() + " "}
              <LinkV2
                href="https://twitter.com/dzcode_io"
                style={{ direction: "ltr", display: "inline-block" }}
              >
                {"@dzCode_io"}
              </LinkV2>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
