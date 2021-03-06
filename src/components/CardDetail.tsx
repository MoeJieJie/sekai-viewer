import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Slider,
  Tab,
  Tabs,
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useLayoutStyles } from "../styles/layout";
import { TabContext, TabPanel } from "@material-ui/lab";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Viewer from "react-viewer";
import { ImageDecorator } from "react-viewer/lib/ViewerProps";

import {
  ContentTransModeType,
  ICardEpisode,
  ICardInfo,
  ICardRarity,
  ICharacterRank,
  ICharaProfile,
  IReleaseCondition,
  IResourceBoxInfo,
  ISkillInfo,
  ResourceBoxDetail,
} from "../types";
import { useCachedData } from "../utils";
import rarityNormal from "../assets/rarity_star_normal.png";
import rarityAfterTraining from "../assets/rarity_star_afterTraining.png";
import IconPerformance from "../assets/icon_performance.png";
import IconTechnique from "../assets/icon_technique.png";
import IconStamina from "../assets/icon_stamina.png";
import IconTotalStrength from "../assets/icon_totalStrength.png";

import LogoLightSound from "../assets/common/logol/logo_light_sound.png";
import LogoIdol from "../assets/common/logol/logo_idol.png";
import LogoPiapro from "../assets/common/logol/logo_piapro.png";
import LogoSchoolRefusal from "../assets/common/logol/logo_school_refusal.png";
import LogoStreet from "../assets/common/logol/logo_street.png";
import LogoThemePark from "../assets/common/logol/logo_theme_park.png";

import { CardThumb } from "./subs/CardThumb";
import { attrIconMap } from "../utils/resources";
import { useTranslation } from "react-i18next";
import MaterialIcon from "./subs/MaterialIcon";
import CommonMaterialIcon from "./subs/CommonMaterialIcon";
import { getAssetI18n } from "../utils/i18n";

const useStyles = makeStyles((theme) => ({
  "rarity-star-img": {
    maxWidth: "32px",
    margin: theme.spacing(0, 0.25),
  },
  "card-thumb-img": {
    maxWidth: "100%",
    // margin: theme.spacing(0, 1),
  },
  "unit-logo-img": {
    maxWidth: "128px",
    // margin: theme.spacing(0, 1),
  },
  media: {
    paddingTop: "56.25%",
    cursor: "pointer",
  },
  "media-contain": {
    paddingTop: "56.25%",
    backgroundSize: "contain",
    cursor: "pointer",
  },
  tabpanel: {
    padding: theme.spacing("1%", 0, 0, 0),
  },
  "grid-out": {
    padding: theme.spacing("1%", "0"),
  },
}));

interface IExtendCardInfo extends ICardInfo {
  maxTrainedLevel?: number;
  maxNormalLevel: number;
}

const CardDetail: React.FC<{ contentTransMode: ContentTransModeType }> = ({
  contentTransMode,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const { t } = useTranslation();
  const assetI18n = getAssetI18n();

  const [charas] = useCachedData<ICharaProfile>("gameCharacters");
  const [cards] = useCachedData<ICardInfo>("cards");
  const [rarities] = useCachedData<ICardRarity>("cardRarities");
  const [episodes] = useCachedData<ICardEpisode>("cardEpisodes");
  const [charaRanks] = useCachedData<ICharacterRank>("characterRanks");
  const [skills] = useCachedData<ISkillInfo>("skills");
  const [releaseConds] = useCachedData<IReleaseCondition>("releaseConditions");
  const [resourceBoxes] = useCachedData<IResourceBoxInfo>("resourceBoxes");

  const { cardId } = useParams<{ cardId: string }>();

  const [visible, setVisible] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [card, setCard] = useState<IExtendCardInfo>();
  const [cardTitle, setCardTitle] = useState<string>("");
  const [tabVal, setTabVal] = useState<string>("0");
  const [episodeTabVal, setEpisodeTabVal] = useState<string>("1");
  const [cardLevel, setCardLevel] = useState<number | number[]>(0);
  const [skill, setSkill] = useState<ISkillInfo>();
  const [skillLevel, setSkillLevel] = useState<number | number[]>(0);
  const [cardEpisode, setCardEpisode] = useState<ICardEpisode[]>([]);
  const [sideStory1Unlocked, setSideStory1Unlocked] = useState<boolean>(true);
  const [sideStory2Unlocked, setSideStory2Unlocked] = useState<boolean>(true);
  // const [cardRank, setCardRank] = useState<number | number[]>(0);
  // const [maxCardRank, setMaxCardRank] = useState<number>(0);

  const getCharaName = useCallback(
    (charaId: number) => {
      const chara = charas.find((chara) => chara.id === charaId);
      if (chara?.firstName) {
        switch (contentTransMode) {
          case "original":
            return `${chara.firstName} ${chara.givenName}`;
          case "translated":
            return ["zh-CN", "zh-TW", "ko", "ja"].includes(assetI18n.language)
              ? `${assetI18n.t(
                  `character_name:${charaId}.firstName`
                )} ${assetI18n.t(`character_name:${charaId}.givenName`)}`
              : `${assetI18n.t(
                  `character_name:${charaId}.givenName`
                )} ${assetI18n.t(`character_name:${charaId}.firstName`)}`;
        }
      }
      return chara?.givenName;
    },
    [charas, contentTransMode, assetI18n]
  );

  const getSkillDesc = useCallback(
    (skill: ISkillInfo, skillLevel: number | number[]) => {
      let skillInfo =
        contentTransMode === "original"
          ? skill.description
          : contentTransMode === "translated"
          ? assetI18n.t(`skill_desc:${skill.id}`, {
              interpolation: { prefix: "[", suffix: "]" },
            })
          : skill.description;

      for (let elem of skill.skillEffects) {
        skillInfo = skillInfo.replace(
          new RegExp(`{{${elem.id};d}}`),
          String(
            elem.skillEffectDetails.find((d) => d.level === skillLevel)!
              .activateEffectDuration
          )
        );
        skillInfo = skillInfo.replace(
          new RegExp(`{{${elem.id};v}}`),
          String(
            elem.skillEffectDetails.find((d) => d.level === skillLevel)!
              .activateEffectValue
          )
        );
      }

      return skillInfo;
    },
    [assetI18n, contentTransMode]
  );

  const getCharaUnitName = useCallback(
    (charaId: number) => {
      const chara = charas.find((chara) => chara.id === charaId);
      return chara?.unit;
    },
    [charas]
  );

  const getUnitImage = useCallback((unitName?: string) => {
    switch (unitName) {
      case "idol":
        return LogoIdol;
      case "light_sound":
        return LogoLightSound;
      case "piapro":
        return LogoPiapro;
      case "school_refusal":
        return LogoSchoolRefusal;
      case "street":
        return LogoStreet;
      case "theme_park":
        return LogoThemePark;
    }
    return "";
  }, []);

  const getCharaUnitImage = useCallback(
    (charaId: number) => {
      const chara = charas.find((chara) => chara.id === charaId);
      return getUnitImage(chara?.unit);
    },
    [charas, getUnitImage]
  );

  const getCardImages: () => ImageDecorator[] = useCallback(
    () =>
      card
        ? card?.rarity >= 3
          ? [
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_normal.webp`,
                alt: "card normal",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_normal.webp`,
              },
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/normal.webp`,
                alt: "card normal trim",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/normal.webp`,
              },
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_after_training.webp`,
                alt: "card after training",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_after_training.webp`,
              },
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/after_training.webp`,
                alt: "card after training trim",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/after_training.webp`,
              },
            ]
          : [
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_normal.webp`,
                alt: "card normal",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_normal.webp`,
              },
              {
                src: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/normal.webp`,
                alt: "card normal",
                downloadUrl: `${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/normal.webp`,
              },
            ]
        : [],
    [card]
  );

  useEffect(() => {
    if (cards.length && rarities.length && skills.length && episodes.length) {
      const _card = cards.find((elem) => elem.id === Number(cardId))!;
      setCard(
        Object.assign({}, _card, {
          maxTrainedLevel: rarities.find((elem) => elem.rarity === _card.rarity)
            ?.trainingMaxLevel,
          maxNormalLevel: rarities.find((elem) => elem.rarity === _card.rarity)
            ?.maxLevel!,
        })
      );
      setCardTitle(
        `${
          contentTransMode === "original"
            ? _card.prefix
            : contentTransMode === "translated"
            ? assetI18n.t(`card_prefix:${_card.id}`)
            : _card.prefix
        } - ${getCharaName(_card.characterId)}`
      );
      setCardLevel(
        _card.rarity >= 3
          ? rarities.find((elem) => elem.rarity === _card.rarity)
              ?.trainingMaxLevel!
          : rarities.find((elem) => elem.rarity === _card.rarity)?.maxLevel!
      );
      const _skill = skills.find((elem) => elem.id === _card.skillId)!;
      setSkill(_skill);
      setSkillLevel(
        _skill.skillEffects[0].skillEffectDetails[
          _skill.skillEffects[0].skillEffectDetails.length - 1
        ].level
      );
      setCardEpisode(episodes.filter((epi) => epi.cardId === Number(cardId)));
      document.title = `${_card.prefix} | ${getCharaName(
        _card.characterId
      )} | Card | Sekai Viewer`;
    }
  }, [
    setCard,
    cards,
    cardId,
    rarities,
    skills,
    getCharaName,
    episodes,
    assetI18n,
    assetI18n.language,
    contentTransMode,
  ]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabVal(newValue);
  };

  return card &&
    charaRanks.length &&
    releaseConds.length &&
    resourceBoxes.length ? (
    <Fragment>
      <Typography variant="h6" className={layoutClasses.header}>
        {cardTitle}
      </Typography>
      <Container className={layoutClasses.content} maxWidth="sm">
        <TabContext value={tabVal}>
          <Paper>
            <Tabs
              value={tabVal}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="desktop"
            >
              <Tab label={t("card:tab.title[0]")} value="0"></Tab>
              <Tab label={t("card:tab.title[1]")} value="2"></Tab>
              {card.rarity >= 3 ? (
                <Tab label={t("card:tab.title[2]")} value="1"></Tab>
              ) : null}
              {card.rarity >= 3 ? (
                <Tab label={t("card:tab.title[3]")} value="3"></Tab>
              ) : null}
            </Tabs>
            <TabPanel value="0" classes={{ root: classes.tabpanel }}>
              <Card
                onClick={() => {
                  setActiveIdx(0);
                  setVisible(true);
                }}
              >
                <CardMedia
                  classes={{ root: classes.media }}
                  image={`${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_normal.webp`}
                ></CardMedia>
              </Card>
            </TabPanel>
            <TabPanel value="1" classes={{ root: classes.tabpanel }}>
              <Card
                onClick={() => {
                  setActiveIdx(2);
                  setVisible(true);
                }}
              >
                <CardMedia
                  classes={{ root: classes.media }}
                  image={`${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member/${card.assetbundleName}_rip/card_after_training.webp`}
                ></CardMedia>
              </Card>
            </TabPanel>
            <TabPanel value="2" classes={{ root: classes.tabpanel }}>
              <Card
                onClick={() => {
                  setActiveIdx(1);
                  setVisible(true);
                }}
              >
                <CardMedia
                  classes={{ root: classes["media-contain"] }}
                  image={`${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/normal.webp`}
                ></CardMedia>
              </Card>
            </TabPanel>
            <TabPanel value="3" classes={{ root: classes.tabpanel }}>
              <Card
                onClick={() => {
                  setActiveIdx(3);
                  setVisible(true);
                }}
              >
                <CardMedia
                  classes={{ root: classes["media-contain"] }}
                  image={`${process.env.REACT_APP_ASSET_DOMAIN}/file/sekai-assets/character/member_cutout_trm/${card.assetbundleName}_rip/after_training.webp`}
                ></CardMedia>
              </Card>
            </TabPanel>
          </Paper>
        </TabContext>
        <Grid className={classes["grid-out"]} container direction="column">
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:id")}
            </Typography>
            <Typography>{card.id}</Typography>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:title")}
            </Typography>
            <Typography>
              {contentTransMode === "original"
                ? card.prefix
                : contentTransMode === "translated"
                ? assetI18n.t(`card_prefix:${card.id}`)
                : card.prefix}
            </Typography>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:character")}
            </Typography>
            <Typography>{getCharaName(card.characterId)}</Typography>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:unit")}
            </Typography>
            <img
              className={classes["unit-logo-img"]}
              src={getCharaUnitImage(card.characterId)}
              alt={getCharaUnitName(card.characterId)}
            ></img>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          {card.supportUnit !== "none" ? (
            <Fragment>
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  {t("common:support_unit")}
                </Typography>
                <img
                  className={classes["unit-logo-img"]}
                  src={getUnitImage(card.supportUnit)}
                  alt={card.supportUnit}
                ></img>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
            </Fragment>
          ) : null}
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:attribute")}
            </Typography>
            <img
              src={attrIconMap[card.attr]}
              alt={card.attr}
              className={classes["rarity-star-img"]}
            ></img>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:startAt")}
            </Typography>
            <Typography>{new Date(card.releaseAt).toLocaleString()}</Typography>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:rarity")}
            </Typography>
            <Typography>
              {Array.from({ length: card.rarity }).map((_, id) => (
                <img
                  className={classes["rarity-star-img"]}
                  src={
                    cardLevel > card.maxNormalLevel
                      ? rarityAfterTraining
                      : rarityNormal
                  }
                  alt={`star-${id}`}
                  key={`star-${id}`}
                ></img>
              ))}
            </Typography>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                {t("common:thumb")}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end" spacing={2}>
                <Grid item xs={12} md={6}>
                  <CardThumb id={Number(cardId)} />
                </Grid>
                {card.rarity >= 3 ? (
                  <Grid item xs={12} md={6}>
                    <CardThumb id={Number(cardId)} trained />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ margin: "1% 0" }} />
        </Grid>
      </Container>
      <Typography variant="h6" className={layoutClasses.header}>
        {t("card:stats")}
      </Typography>
      <Container className={layoutClasses.content} maxWidth="sm">
        <Grid className={classes["grid-out"]} container direction="column">
          <Grid
            container
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              {t("common:skill")}
            </Typography>
            <Typography>
              {contentTransMode === "original"
                ? card.cardSkillName
                : contentTransMode === "translated"
                ? assetI18n.t(`card_skill_name:${cardId}`)
                : card.cardSkillName}
            </Typography>
          </Grid>
          <Box>
            {/* <Typography>Skill level</Typography> */}
            <Slider
              value={skillLevel}
              onChange={(e, value) => setSkillLevel(value)}
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={
                skill!.skillEffects[0].skillEffectDetails[
                  skill!.skillEffects[0].skillEffectDetails.length - 1
                ].level
              }
            />
            {/* <Typography>{skill?.shortDescription}</Typography> */}
            <Typography>{getSkillDesc(skill!, skillLevel)}</Typography>
          </Box>
          <Divider style={{ margin: "1% 0" }} />
          <Box>
            <Typography style={{ fontWeight: 600 }}>
              {t("card:power")}
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={sideStory1Unlocked}
                    onChange={() => setSideStory1Unlocked((v) => !v)}
                  />
                }
                label={t("card:sideStory1Unlocked")}
              ></FormControlLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={sideStory2Unlocked}
                    onChange={() => setSideStory2Unlocked((v) => !v)}
                  />
                }
                label={t("card:sideStory2Unlocked")}
              ></FormControlLabel>
            </FormGroup>
            <Slider
              value={cardLevel}
              onChange={(e, value) => setCardLevel(value)}
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={
                card.rarity >= 3 ? card.maxTrainedLevel : card.maxNormalLevel
              }
              marks={
                card.rarity >= 3
                  ? [
                      {
                        value: card.maxNormalLevel,
                        label: "Normal",
                      },
                      {
                        value: card.maxTrainedLevel!,
                        label: "Trained",
                      },
                    ]
                  : [
                      {
                        value: card.maxNormalLevel,
                        label: "Normal",
                      },
                    ]
              }
            />
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item md={3} xs={6}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      wrap="nowrap"
                    >
                      <Grid item xs={3}>
                        <img
                          src={IconPerformance}
                          alt="performance"
                          style={{ marginRight: "7%" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {card.cardParameters.find(
                            (elem) =>
                              elem.cardParameterType === "param1" &&
                              elem.cardLevel === cardLevel
                          )?.power! +
                            (cardLevel > card.maxNormalLevel
                              ? card.specialTrainingPower1BonusFixed
                              : 0) +
                            (sideStory1Unlocked
                              ? cardEpisode[0].power1BonusFixed
                              : 0) +
                            (sideStory2Unlocked
                              ? cardEpisode[1].power1BonusFixed
                              : 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={3} xs={6}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      wrap="nowrap"
                    >
                      <Grid item xs={3}>
                        <img
                          src={IconTechnique}
                          alt="technique"
                          style={{ marginRight: "7%" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {card.cardParameters.find(
                            (elem) =>
                              elem.cardParameterType === "param2" &&
                              elem.cardLevel === cardLevel
                          )?.power! +
                            (cardLevel > card.maxNormalLevel
                              ? card.specialTrainingPower2BonusFixed
                              : 0) +
                            (sideStory1Unlocked
                              ? cardEpisode[0].power2BonusFixed
                              : 0) +
                            (sideStory2Unlocked
                              ? cardEpisode[1].power2BonusFixed
                              : 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={3} xs={6}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      wrap="nowrap"
                    >
                      <Grid item xs={3}>
                        <img
                          src={IconStamina}
                          alt="stamina"
                          style={{ marginRight: "7%" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {card.cardParameters.find(
                            (elem) =>
                              elem.cardParameterType === "param3" &&
                              elem.cardLevel === cardLevel
                          )?.power! +
                            (cardLevel > card.maxNormalLevel
                              ? card.specialTrainingPower3BonusFixed
                              : 0) +
                            (sideStory1Unlocked
                              ? cardEpisode[0].power3BonusFixed
                              : 0) +
                            (sideStory2Unlocked
                              ? cardEpisode[1].power3BonusFixed
                              : 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={3} xs={6}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      wrap="nowrap"
                    >
                      <Grid item xs={3}>
                        <img
                          src={IconTotalStrength}
                          alt="total strength"
                          style={{ marginRight: "7%", height: "34px" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {card.cardParameters
                            .filter((elem) => elem.cardLevel === cardLevel)
                            .reduce((sum, elem) => sum + elem.power, 0) +
                            (cardLevel > card.maxNormalLevel
                              ? card.specialTrainingPower1BonusFixed +
                                card.specialTrainingPower2BonusFixed +
                                card.specialTrainingPower3BonusFixed
                              : 0) +
                            (sideStory1Unlocked
                              ? cardEpisode[0].power1BonusFixed +
                                cardEpisode[0].power2BonusFixed +
                                cardEpisode[0].power3BonusFixed
                              : 0) +
                            (sideStory2Unlocked
                              ? cardEpisode[1].power1BonusFixed +
                                cardEpisode[1].power2BonusFixed +
                                cardEpisode[1].power3BonusFixed
                              : 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Divider style={{ margin: "1% 0" }} />
        </Grid>
      </Container>
      <Typography variant="h6" className={layoutClasses.header}>
        {t("card:sideStory", { count: cardEpisode.length })}
      </Typography>
      <Container className={layoutClasses.content} maxWidth="sm">
        <TabContext value={episodeTabVal}>
          <Tabs
            value={episodeTabVal}
            onChange={(e, v) => setEpisodeTabVal(v)}
            variant="scrollable"
            scrollButtons="desktop"
          >
            <Tab label={cardEpisode[0].title} value="1"></Tab>
            <Tab label={cardEpisode[1].title} value="2"></Tab>
          </Tabs>
          <TabPanel value="1" classes={{ root: classes.tabpanel }}>
            <Grid container direction="column">
              {/* <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  {t("common:title")}
                </Typography>
                <Typography>{cardEpisode[0].title}</Typography>
              </Grid>
              <Divider style={{ margin: "1% 0" }} /> */}
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:releaseCondition")}
                  </Typography>
                </Grid>
                <Grid item xs={8} container justify="flex-end">
                  <Typography>
                    {
                      releaseConds.find(
                        (rc) => rc.id === cardEpisode[0].releaseConditionId
                      )?.sentence
                    }
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:releaseCosts")}
                  </Typography>
                </Grid>
                <Grid item container spacing={1} xs={10} justify="flex-end">
                  {cardEpisode[0].costs.map((c, idx) => (
                    <Grid key={`episode-cost-${idx}`} item>
                      <MaterialIcon
                        materialId={c.resourceId}
                        quantity={c.quantity}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:rewards")}
                  </Typography>
                </Grid>
                <Grid item container spacing={1} xs={10} justify="flex-end">
                  {resourceBoxes
                    .filter(
                      (rb) =>
                        rb.resourceBoxPurpose === "episode_reward" &&
                        cardEpisode[0].rewardResourceBoxIds.includes(rb.id)
                    )
                    .reduce(
                      (sum, rb) => [...sum, ...rb.details],
                      [] as ResourceBoxDetail[]
                    )
                    .map((rbd, idx) => (
                      <Grid key={`episode-reward-${idx}`} item>
                        <CommonMaterialIcon
                          materialName={rbd.resourceType}
                          materialId={rbd.resourceId}
                          quantity={rbd.resourceQuantity}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
            </Grid>
          </TabPanel>
          <TabPanel value="2" classes={{ root: classes.tabpanel }}>
            <Grid container direction="column">
              {/* <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  {t("common:title")}
                </Typography>
                <Typography>{cardEpisode[1].title}</Typography>
              </Grid>
              <Divider style={{ margin: "1% 0" }} /> */}
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:releaseCondition")}
                  </Typography>
                </Grid>
                <Grid item xs={8} container justify="flex-end">
                  <Typography>
                    {
                      releaseConds.find(
                        (rc) => rc.id === cardEpisode[1].releaseConditionId
                      )?.sentence
                    }
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:releaseCosts")}
                  </Typography>
                </Grid>
                <Grid item container spacing={1} xs={10} justify="flex-end">
                  {cardEpisode[1].costs.map((c, idx) => (
                    <Grid key={`episode-cost-${idx}`} item>
                      <MaterialIcon
                        materialId={c.resourceId}
                        quantity={c.quantity}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {t("common:rewards")}
                  </Typography>
                </Grid>
                <Grid item container spacing={1} xs={10} justify="flex-end">
                  {resourceBoxes
                    .filter(
                      (rb) =>
                        rb.resourceBoxPurpose === "episode_reward" &&
                        cardEpisode[1].rewardResourceBoxIds.includes(rb.id)
                    )
                    .reduce(
                      (sum, rb) => [...sum, ...rb.details],
                      [] as ResourceBoxDetail[]
                    )
                    .map((rbd, idx) => (
                      <Grid key={`episode-reward-${idx}`} item>
                        <CommonMaterialIcon
                          materialName={rbd.resourceType}
                          materialId={rbd.resourceId}
                          quantity={rbd.resourceQuantity}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Divider style={{ margin: "1% 0" }} />
            </Grid>
          </TabPanel>
        </TabContext>
      </Container>
      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={getCardImages()}
        zIndex={2000}
        activeIndex={activeIdx}
        downloadable
        downloadInNewWindow
        onMaskClick={() => setVisible(false)}
        onChange={(_, idx) => setActiveIdx(idx)}
        zoomSpeed={0.25}
      />
    </Fragment>
  ) : (
    <div>
      Loading... If you saw this for a while, card {cardId} does not exist.
    </div>
  );
};

export default CardDetail;
