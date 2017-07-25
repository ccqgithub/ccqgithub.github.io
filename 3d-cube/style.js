import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "body": {
        "background": "#000",
        "overflow": "hidden"
    },
    "box": {
        "position": "fixed",
        "width": "100%",
        "height": "100%",
        "left": 0,
        "top": 0,
        "overflow": "hidden"
    },
    "element": {
        "width": 400,
        "height": 400,
        "background": "rgba(127,255,255,0.65)",
        "boxShadow": "0px 0px 12px rgba(0,255,255,0.5)",
        "border": "1px solid rgba(127,255,255,0.95)",
        "textAlign": "center",
        "cursor": "pointer",
        "lineHeight": 300
    },
    "element-big": {
        "width": 300,
        "height": 300,
        "background": "none",
        "boxShadow": "0px 0px 0px",
        "border": "none",
        "textAlign": "center",
        "cursor": "pointer",
        "lineHeight": 300
    },
    "element:hover": {
        "boxShadow": "0px 0px 30px 10px rgba(0,255,255,0.75)",
        "border": "2px solid rgba(127,255,255,0.75)"
    },
    "element img": {
        "display": "block",
        "width": "100%",
        "height": "100%"
    },
    "element-big img": {
        "display": "block",
        "width": "100%",
        "height": "100%"
    }
});