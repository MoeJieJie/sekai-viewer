import {
  AppBar,
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AspectRatio as AspectRatioIcon,
  Album as AlbumIcon,
  MoveToInbox as MoveToInboxIcon,
  ArrowBackIos as ArrowBackIosIcon,
  Settings as SettingsIcon,
  Brightness4,
  Brightness7,
  BrightnessAuto,
  ControlCamera,
  QueueMusic,
} from "@material-ui/icons";
import {
  Account,
  AccountGroup,
  Calculator,
  CalendarText,
} from "mdi-material-ui";
import React, { forwardRef, useMemo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  LinkProps,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { ContentTransModeType } from "../types";
import { getAssetI18n } from "../utils/i18n";

const drawerWidth = 240;
const CardList = lazy(() => import("./CardList"));
const HomeView = lazy(() => import("./Home"));
const MusicList = lazy(() => import("./MusicList"));
const GachaList = lazy(() => import("./GachaList"));
const EventList = lazy(() => import("./EventList"));
const GachaDetail = lazy(() => import("./GachaDetail"));
const CardDetail = lazy(() => import("./CardDetail"));
const MusicDetail = lazy(() => import("./MusicDetail"));
const EventDetail = lazy(() => import("./EventDetail"));

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    // justifyContent: 'flex-end'
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

interface IListItemLinkProps {
  icon: React.ReactElement;
  text: string;
  to: string;
  disabled: boolean;
  children?: IListItemLinkProps[];
}

function ListItemLink(
  props: IListItemLinkProps & { theme: Theme }
): React.ReactElement<IListItemLinkProps> {
  const { icon, text, to, theme } = props;
  const match = useRouteMatch({
    path: to,
    exact: to === "/",
  });
  // const theme = useTheme();

  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li
      style={{
        width: "100%",
      }}
    >
      {/*
      // @ts-ignore */}
      <ListItem component={renderLink}>
        <ListItemIcon
          style={{
            color: match
              ? theme!.palette.secondary.main
              : theme!.palette.text.primary,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          style={{
            color: match
              ? theme!.palette.secondary.main
              : theme!.palette.text.primary,
          }}
        ></ListItemText>
      </ListItem>
    </li>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const assetI18n = getAssetI18n();

  const leftBtns: IListItemLinkProps[][] = [
    [
      {
        text: t("common:home"),
        icon: <HomeIcon></HomeIcon>,
        to: "/",
        disabled: false,
      },
      {
        text: t("common:card"),
        icon: <AspectRatioIcon></AspectRatioIcon>,
        to: "/card",
        disabled: false,
      },
      {
        text: t("common:music"),
        icon: <AlbumIcon></AlbumIcon>,
        to: "/music",
        disabled: false,
      },
      {
        text: t("common:gacha"),
        icon: <MoveToInboxIcon></MoveToInboxIcon>,
        to: "/gacha",
        disabled: false,
      },
      {
        text: t("common:event"),
        icon: <CalendarText></CalendarText>,
        to: "/event",
        disabled: false,
      },
      {
        text: t("common:unit"),
        icon: <AccountGroup></AccountGroup>,
        to: "/unit",
        disabled: true,
      },
      {
        text: t("common:member"),
        icon: <Account></Account>,
        to: "/member",
        disabled: true,
      },
      {
        text: "Live2D",
        icon: <ControlCamera></ControlCamera>,
        to: "/live2d",
        disabled: true,
      },
    ],
    [
      {
        text: t("common:musicMeta"),
        icon: <QueueMusic />,
        to: "/music_meta",
        disabled: true,
      },
      {
        text: t("common:scoreCalculator"),
        icon: <Calculator />,
        to: "/score_calc",
        disabled: true,
      },
    ],
  ];
  // const theme = useTheme();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [lang, setLang] = React.useState(i18n.language);

  const { goBack } = useHistory();

  const preferDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [displayMode, setDisplayMode] = React.useState<
    "dark" | "light" | "auto"
  >(
    (localStorage.getItem("display-mode") as "dark" | "light" | "auto") ||
      "auto"
  );
  const [contentTransMode, setContentTransMode] = React.useState<
    ContentTransModeType
  >(
    (localStorage.getItem(
      "content-translation-mode"
    ) as ContentTransModeType) || "translated"
  );

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type:
            displayMode === "auto"
              ? preferDarkMode
                ? "dark"
                : "light"
              : displayMode,
          primary: {
            main:
              displayMode === "auto"
                ? preferDarkMode
                  ? "#7986cb"
                  : "#3f51b5"
                : displayMode === "dark"
                ? "#7986cb"
                : "#3f51b5",
          },
        },
      }),
    [displayMode, preferDarkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography variant="h6">{t("common:toolbar.title")}</Typography>
      </div>
      <Divider></Divider>
      <List>
        <ListSubheader>{t("common:information")}</ListSubheader>
        {leftBtns[0].map((elem) => {
          return (
            <ListItem disabled={elem.disabled} button key={elem.to}>
              <ListItemLink
                to={elem.to}
                text={elem.text}
                icon={elem.icon}
                disabled={elem.disabled}
                theme={theme}
              ></ListItemLink>
            </ListItem>
          );
        })}
        <ListSubheader>{t("common:tools")}</ListSubheader>
        {leftBtns[1].map((elem) => {
          return (
            <ListItem disabled={elem.disabled} button key={elem.to}>
              <ListItemLink
                to={elem.to}
                text={elem.text}
                icon={elem.icon}
                disabled={elem.disabled}
                theme={theme}
              ></ListItemLink>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap classes={{ root: classes.title }}>
              Sekai Viewer{" "}
              <Typography component="span" variant="body2">
                Open Beta
              </Typography>
            </Typography>
            <IconButton color="inherit" onClick={() => goBack()} disableRipple>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => setIsSettingsOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Container className={classes.content}>
          <div className={classes.toolbar}></div>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact>
                <HomeView />
              </Route>
              <Route path="/card" exact>
                <CardList contentTransMode={contentTransMode} />
              </Route>
              <Route path="/card/:cardId(\d+)">
                <CardDetail contentTransMode={contentTransMode} />
              </Route>
              <Route path="/music" exact>
                <MusicList contentTransMode={contentTransMode} />
              </Route>
              <Route path="/music/:musicId(\d+)">
                <MusicDetail contentTransMode={contentTransMode} />
              </Route>
              <Route path="/gacha" exact>
                <GachaList contentTransMode={contentTransMode} />
              </Route>
              <Route path="/gacha/:gachaId">
                <GachaDetail contentTransMode={contentTransMode} />
              </Route>
              <Route path="/event" exact>
                <EventList contentTransMode={contentTransMode} />
              </Route>
              <Route path="/event/:eventId">
                <EventDetail contentTransMode={contentTransMode} />
              </Route>
            </Suspense>
          </Switch>
        </Container>
        <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
          <DialogTitle>{t("common:settings.title")}</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset" style={{ margin: "1% 0" }}>
              <FormLabel component="legend">{t("common:language")}</FormLabel>
              <RadioGroup
                row
                aria-label="language"
                value={lang}
                onChange={(e, v) => {
                  setLang(v);
                  i18n.changeLanguage(v);
                  assetI18n.changeLanguage(v);
                }}
              >
                <FormControlLabel
                  value="en"
                  control={<Radio />}
                  label="EN"
                ></FormControlLabel>
                <FormControlLabel
                  value="zh-CN"
                  control={<Radio />}
                  label="简"
                ></FormControlLabel>
                <FormControlLabel
                  value="zh-TW"
                  control={<Radio />}
                  label="繁"
                ></FormControlLabel>
                <FormControlLabel
                  value="ja"
                  control={<Radio />}
                  label="日"
                ></FormControlLabel>
                <FormControlLabel
                  value="ko"
                  control={<Radio />}
                  label="한"
                ></FormControlLabel>
                <FormControlLabel
                  value="es"
                  control={<Radio />}
                  label="Es"
                ></FormControlLabel>
                <FormControlLabel
                  value="de"
                  control={<Radio />}
                  label="De"
                ></FormControlLabel>
                <FormControlLabel
                  value="pt-BR"
                  control={<Radio />}
                  label="Pt-BR"
                ></FormControlLabel>
                <FormControlLabel
                  value="ru"
                  control={<Radio />}
                  label="русский"
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ margin: "1% 0" }}>
              <FormLabel component="legend">{t("common:darkmode")}</FormLabel>
              <RadioGroup
                row
                aria-label="dark mode"
                value={displayMode}
                onChange={(e, v) => {
                  setDisplayMode(v as "dark" | "light" | "auto");
                  localStorage.setItem("display-mode", v);
                }}
              >
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label={<Brightness4 />}
                ></FormControlLabel>
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label={<Brightness7 />}
                ></FormControlLabel>
                <FormControlLabel
                  value="auto"
                  control={<Radio />}
                  label={<BrightnessAuto />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ margin: "1% 0" }}>
              <FormLabel component="legend">
                {t("common:contentTranslationMode.title")}
              </FormLabel>
              <RadioGroup
                row
                aria-label="show translated"
                value={contentTransMode}
                onChange={(e, v) => {
                  setContentTransMode(v as "original" | "translated" | "both");
                  localStorage.setItem("content-translation-mode", v);
                }}
              >
                <FormControlLabel
                  value="original"
                  control={<Radio />}
                  label={t("common:contentTranslationMode.original")}
                ></FormControlLabel>
                <FormControlLabel
                  value="translated"
                  control={<Radio />}
                  label={t("common:contentTranslationMode.translated")}
                ></FormControlLabel>
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label={t("common:contentTranslationMode.both")}
                  disabled
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSettingsOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
