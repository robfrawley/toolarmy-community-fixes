// ==UserScript==
// @name         Tool Army Community Fixes
// @namespace    https://github.com/robfrawley/toolarmy-community-fixes
// @version      0.5.1
// @description  A collection of CSS style fixes and JavaScript behavioral changes for the Tool Army website.
// @author       Rob Frawley 2nd <src@robfrawley.com>
// @copyright    2023
// @license      https://src.mit-license.com/
// @match        https://www.toolband.com/*
// @grant        GM_addStyle
// @grant        GM_log
// @require      https://code.jquery.com/jquery-3.7.0.min.js
// @icon         https://github.com/robfrawley/toolarmy-community-fixes/raw/main/toolarmy-community-fixes-512px512.png
// @downloadURL  https://github.com/robfrawley/toolarmy-community-fixes/raw/main/toolarmy-community-fixes.user.js
// @updateURL    https://github.com/robfrawley/toolarmy-community-fixes/raw/main/toolarmy-community-fixes.user.js
// @supportURL   https://github.com/robfrawley/toolarmy-community-fixes/issues
// ==/UserScript==

(function(jq) {
    'use strict';

    /* user-facing configuration variables */

    const stylingDarkerEnable = true;

    /* internal-use configuration variables */

    const verbosityLevelActive = 'warn';

    /* injected assets */

    const mailIconSvgImage = '<svg viewBox="0 0 34 23.944" xmlns="http://www.w3.org/2000/svg"><path d="m34,1.954v19.995c-.032.042-.075.08-.095.127-.396.938-1.065,1.563-2.086,1.79-.035.008-.061.052-.091.079h-.126c-.009-.035-.017-.071-.041-.166-.025.094-.034.13-.043.166H2.567c-.077-.094-.164-.161-.297-.117-.165-.045-.341-.068-.493-.14-.8-.377-1.314-1.006-1.602-1.825-.002-.124-.006-.247-.007-.371,0-.129.016-.267-.169-.291C0,21.131,0,21.062,0,20.993c.048-.04.096-.081.144-.121-.048-.029-.096-.058-.144-.087,0-6.042,0-12.083,0-18.125.028-.037.067-.07.081-.111.098-.304.148-.632.294-.912C.788.845,1.391.265,2.329.114,2.399.103,2.46.039,2.525,0c.084,0,.168,0,.252,0h.168C12.526,0,22.106,0,31.686,0c.003.019.006.037.008.056.155.041.313.071.463.124.746.261,1.288.747,1.632,1.452.056.114.14.215.21.323ZM2.186,1.36c-.004.021-.008.042-.013.063.08.074.158.149.24.222.338.301.677.6,1.016.901,3.04,2.695,6.08,5.391,9.121,8.085,1.455,1.289,2.912,2.577,4.365,3.868.124.11.214.119.339.005.381-.348.77-.687,1.156-1.03,2.075-1.841,4.151-3.682,6.225-5.524,1.262-1.12,2.52-2.244,3.783-3.362,1.132-1.003,2.269-2.001,3.402-3.003.048-.043.077-.106.115-.16-.058-.031-.113-.084-.173-.091-.29-.032-.581-.072-.872-.072-8.5-.005-16.999-.006-25.499-.005-.939,0-1.877.018-2.816.034-.13.002-.258.045-.388.069Zm-.107,21.148c.166.056.299.13.438.143.34.031.682.045,1.023.045,9.283,0,18.567-.001,27.85-.009.173,0,.349-.069.519-.118.123-.036.149-.1.047-.208-.845-.898-1.683-1.801-2.527-2.7-1.306-1.392-2.615-2.78-3.92-4.172-1.047-1.117-2.091-2.236-3.137-3.354-.093-.099-.187-.198-.284-.3-.137.113-.258.208-.373.309-1.374,1.212-2.746,2.427-4.122,3.636-.436.383-.635.342-1.011.007-1.067-.95-2.137-1.897-3.207-2.844-.421-.373-.844-.744-1.284-1.131-3.338,3.566-6.66,7.115-10.012,10.697Zm30.747-.938c.024,0,.048-.002.073-.002.03-.31.087-.619.087-.929.005-5.797.004-11.593.002-17.39,0-.192-.018-.385-.045-.575-.017-.121-.065-.238-.111-.4-3.316,2.939-6.59,5.841-9.875,8.754,3.299,3.524,6.584,7.034,9.869,10.543Zm-31.559.046c.145-.139.249-.228.342-.327,1.924-2.054,3.847-4.108,5.769-6.163,1.217-1.302,2.429-2.609,3.652-3.905.142-.151.139-.232-.012-.364-1.13-.995-2.253-1.997-3.38-2.996-1.533-1.36-3.067-2.72-4.6-4.08-.517-.458-1.034-.915-1.55-1.374-.124-.111-.204-.118-.228.075-.021.169-.078.337-.078.505-.003,6.034-.002,12.069.003,18.103,0,.155.047.311.082.527Z"/><path d="m.176,21.863c-.059-.013-.117-.026-.176-.038,0-.208,0-.416,0-.624.185.024.168.162.169.291,0,.124.004.247.007.371Z"/><path d="m2.272,23.944c0-.039-.001-.078-.002-.117.132-.044.22.023.297.117h-.295Z"/><path d="m0,20.785c.048.029.096.058.144.087-.048.04-.096.081-.144.121,0-.069,0-.139,0-.208Z"/><path d="m31.517,23.944c.009-.036.019-.071.043-.166.024.095.032.13.041.166h-.084Z"/><path d="m31.812,0c-.039.019-.079.037-.118.056-.003-.019-.006-.037-.008-.056.042,0,.084,0,.126,0Z"/></svg>';

    /* class declarations  */

    class Normalizer {
        static trimArrayValues(array) {
            return array.map((value) => String(value).trim());
        }

        static toArray(value) {
            return Array.isArray(value) ? value : Array(value);
        }

        static toString(value, ...args) {
            try {
                value = typeof value === 'function' ? value(...args) : value;
            } catch {
                value = undefined;
            }

            return String(typeof value === 'undefined' ? '' : value);
        }
    }

    class ConsoleLogger {
        _levelsAvail = [ 'none', 'fail', 'warn', 'info', ];

        constructor(level) {
            this._levelActive = this._normalizeLevelToIndex(level);
        }

        log(level, ...outputs) {
            if (this._logWithVerbosityLevel(level)) {
                outputs.unshift(`[${this._normalizeLevelToTitle(level).toUpperCase()}]`);
                console.log(...outputs);
            }
        }

        info(...outputs) {
            this.log('info', ...outputs);
        }

        warn(...outputs) {
            this.log('warn', ...outputs);
        }

        fail(...outputs) {
            this.log('fail', ...outputs);
        }

        _logWithVerbosityLevel(level) {
            const levelCheck = this._normalizeLevelToIndex(level);

            return this._levelActive >= levelCheck
                && !(0 === levelCheck && 0 < this._levelActive);
        }

        _normalizeLevelToIndex(level) {
            return typeof level === 'string'
                ? this._levelsAvail.indexOf(
                    this._levelsAvail.filter((l) => {
                        return level === l;
                    }).shift() || this._levelsAvail[this._levelsAvail.length - 1]
                ) : level;
        }

        _normalizeLevelToTitle(level) {
            return String(this._levelsAvail[
                this._normalizeLevelToIndex(level)
            ]);
        }
    }

    class StyleProperty {
        constructor(styleName, styleVals, important = true) {
            this._styleName = this._sanitizeInput(styleName);
            this._styleVals = this._sanitizeInput(styleVals);
            this._important = important ? true : false;
        }

        stringify() {
            return `${this._styleName}: ${this._styleVals}${
                this._important ? ' !important' : ''
            }`;
        }

        getStyleName() {
            return this._styleName;
        }

        getStyleVals() {
            return this._styleVals;
        }

        isStyleImportant() {
            return this._important;
        }

        isValid() {
            return this._styleName.length > 0
                && this._styleVals.length > 0;
        }

        mergeStyleProperty(mergingStyleProperty) {
            this._styleVals = mergingStyleProperty.getStyleVals();
            this._important = mergingStyleProperty.isStyleImportant();

            return this;
        }

        _sanitizeInput(value) {
            return Normalizer.toString(value, this).trim().toLowerCase();
        }
    }

    class StyleSelector {
        constructor(selectors, stylesSet, prettyOut = false) {
            this._selectors = this._normalizeSelectorsInput(selectors);
            this._stylesMap = this._normalizeStylesSetInput(stylesSet);
            this._prettyOut = prettyOut;
        }

        mergeStyleSelector(mergingStyleSelector, inclusiveCheck = false) {
            let currentStyleMap = this.getStyleMap();
            let mergingStyleMap = mergingStyleSelector.getStyleMap();

            this._stylesMap = [...currentStyleMap.map((currentStyleProperty) => {
                for (let i = 0; i < mergingStyleMap.length; i++) {
                    let mergingStyleProperty = mergingStyleMap[i];

                    if (currentStyleProperty.getStyleName() === mergingStyleProperty.getStyleName()) {
                        currentStyleProperty.mergeStyleProperty(mergingStyleProperty);
                        mergingStyleMap.splice(i, 1);
                    }
                }

                return currentStyleProperty;
            }), ...mergingStyleMap];

            return this;
        }

        getStyleMap() {
            return this._stylesMap;
        }

        stringify() {
            let selectors = this.stringifySelectors();
            let styleDefs = this._prettyOut
                ? `\n${this.stringifyStylesSet()}\n`
                : this.stringifyStylesSet();

            return `${selectors} { ${styleDefs} }`
        }

        stringifySelectors() {
            return StyleSelector.selectorArrayToString(
                this._selectors, this._prettyOut ? ',\n' : ', '
            );
        }

        stringifyStylesSet() {
            return this._stylesMap.map((style) => {
                return this._prettyOut ? `\t${style.stringify()};` : `${style.stringify()};`;
            }).join(this._prettyOut ? '\n' : ' ');
        }

        static selectorArrayToString(selectors, glue = ', ') {
            return Normalizer.trimArrayValues(selectors).join(glue);
        }

        _normalizeSelectorsInput(value) {
            return Normalizer.trimArrayValues(Normalizer.toArray(value));
        }

        _normalizeStylesSetInput(value) {
            return Normalizer.toArray(value).filter((style) => style.isValid());
        }
    }

    class StyleConfig {
        constructor(styleType, styleList) {
            this._styleType = styleType;
            this._styleList = styleList;
        }

        getStyleType() {
            return this._styleType;
        }

        getStyleList() {
            return this._styleList;
        }

        mergeStyleConfig(mergingStyleConfig, overwrite = true) {
            let currentStyleList = this._styleList;
            let mergingStyleList = mergingStyleConfig.getStyleList();

            this._styleType += `+${mergingStyleConfig.getStyleType()}`;
            this._styleList = [...currentStyleList.map((currentStyleSelector) => {
                for (let i = 0; i < mergingStyleList.length; i++) {
                    let mergingStyleSelector = mergingStyleList[i];

                    if (currentStyleSelector.stringifySelectors() === mergingStyleSelector.stringifySelectors()) {
                        currentStyleSelector.mergeStyleSelector(mergingStyleSelector);
                        mergingStyleList.splice(i, 1);
                    }
                }

                return currentStyleSelector;
            }), ...mergingStyleList];

            return this;
        }
    }

    class StyleConfigNormal extends StyleConfig {
        constructor(styleList) {
            super('normal', styleList);
        }
    }

    class StyleConfigDarker extends StyleConfig {
        constructor(styleList) {
            super('darker', styleList);
        }
    }

    /* class instance declarations */

    const styleNormal = new StyleConfigNormal([
        new StyleSelector('.fb-navigation-icons a.navbar-dm-icon', [
            new StyleProperty('margin-right', '4px'),
        ]),
        new StyleSelector('.fb-navigation-icons > ul > li:hover a svg', [
            new StyleProperty('filter', 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(1910%) hue-rotate(339deg) brightness(120%) contrast(75%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions', [
            new StyleProperty('border', '4px solid rgb(0 0 0 / 50%)'),
            new StyleProperty('border-left', 'none'),
            new StyleProperty('border-right', 'none'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li', [
            new StyleProperty('background-color', 'rgb(0 0 0 / 20%)'),
            new StyleProperty('border-left', '4px solid rgb(0 0 0 / 25%)'),
            new StyleProperty('border-right', '4px solid rgb(0 0 0 / 25%)'),
            new StyleProperty('margin-bottom', '2px'),
            new StyleProperty('padding', '1em'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li:first-child', [
            new StyleProperty('margin-top', '2px'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus',
        ], [
            new StyleProperty('background-color', 'rgb(0 0 0 / 22.5%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read', [
            new StyleProperty('background-color', 'rgb(142 104 42 / 50%)'),
            new StyleProperty('border-left-color', 'rgb(142 104 42 / 95%)'),
            new StyleProperty('border-right-color', 'rgb(142 104 42 / 95%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus',
        ], [
            new StyleProperty('background-color', 'rgb(142 104 42 / 55%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .profile-pic', [
            new StyleProperty('margin', '1em 1.5em 1em 0.5em'),
            new StyleProperty('border', '2px solid rgb(255 255 255 / 80%)'),
            new StyleProperty('box-shadow', '0 0 0 4px rgb(0 0 0 / 40%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read .profile-pic', [
            new StyleProperty('box-shadow', '0 0 0 4px rgb(39 31 19 / 80%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .content', [
            new StyleProperty('border-bottom', 'none'),
            new StyleProperty('margin', '0'),
            new StyleProperty('padding', '1.0em 0 1.0em 0'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li p:first-child', [
            new StyleProperty('font-size', '1.2em'),
            new StyleProperty('margin-bottom', '0.25em'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p:first-child', [
            new StyleProperty('font-weight', '500'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .content .time', [
            new StyleProperty('float', 'none'),
            new StyleProperty('margin', '0'),
            new StyleProperty('padding', '0'),
        ]),
        new StyleSelector('.upper-heading .comment-reply-head .vote-btn.notification-view-post', [
            new StyleProperty('color', 'rgb(255 255 255 / 50%)'),
        ]),
        new StyleSelector([
            '.fb_layout.modal-open .modal-content .card-data .full-detail .vote-btn:hover',
            '.fb_layout.modal-open .modal-content .card-data .full-detail .vote-btn:focus',
        ], [
            new StyleProperty('border-color', 'rgb(255 255 255 / 70%)'),
            new StyleProperty('background-color', 'rgb(255 255 255 / 5%)'),
            new StyleProperty('color', 'rgb(255 255 255 / 70%)'),
        ]),
        new StyleSelector('.previous-comment-btn span.previous-comment-link', [
            new StyleProperty('color', 'rgb(255 255 255 / 30%)'),
        ]),
        new StyleSelector([
            '.previous-comment-btn span.previous-comment-link:hover',
            '.previous-comment-btn span.previous-comment-link:active ',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 50%)'),
        ]),
        new StyleSelector('.fb_layout .comment-form-outer .messages-box', [
            new StyleProperty('padding', '10px'),
        ]),
        new StyleSelector('#myModal .modal-content .card-data .comment-form-outer .messages-box', [
            new StyleProperty('padding-right', '4px'),
        ]),
        new StyleSelector('.messages-box .showPlaceholder:before', [
            new StyleProperty('cursor', 'text'),
        ]),
        new StyleSelector([
            '.fb_layout .messages-box textarea',
            '.fb_layout .messages-box #makemojifield',
        ], [
            new StyleProperty('max-height', 'none'),
            new StyleProperty('border', '2px solid rgb(0 0 0 / 75%)'),
            new StyleProperty('border-radius', '3px'),
            new StyleProperty('box-shadow', 'inset 0 0 8px 1px rgb(255 255 255 / 90%)'),
            new StyleProperty('cursor', 'text'),
            new StyleProperty('padding', '8px 10px 5px 10px'),
            new StyleProperty('background', 'rgb(255 255 255 / 80%)'),
        ]),
        new StyleSelector([
            '.fb_layout .messages-box textarea:focus',
            '.fb_layout .messages-box #makemojifield:focus',
        ], [
            new StyleProperty('background', 'rgb(255 255 255 / 98%)'),
        ]),
        new StyleSelector([
            '.fb_layout .newfeeds-right .add-forum .form-control',
            '.fb_layout .newfeeds-right .add-forum #makemojifield',
        ], [
            new StyleProperty('height', 'auto'),
        ]),
        new StyleSelector([
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon'
        ], [
            new StyleProperty('top', '11px'),
            new StyleProperty('right', '12px'),
            new StyleProperty('font-size', '18px'),
            new StyleProperty('font-weight', 'bold'),
            new StyleProperty('color', 'rgb(61 60 59 / 50%)'),
            new StyleProperty('text-shadow', '0 0 9px rgb(255 255 255)'),
        ]),
        new StyleSelector([
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon:hover',
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon:focus',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon:hover',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon:focus',
        ], [
            new StyleProperty('color', 'rgb(61 60 59 / 100%)'),
        ]),
        new StyleSelector('.fan-wall-post.discussions .act-drop', [
        ]),
        new StyleSelector('.fan-wall-post.discussions .act-drop .dropdown', [
            new StyleProperty('top', '-50%'),
        ]),
        new StyleSelector('.fan-wall-post.discussions .act-drop .dropdown .option-btn', [
            new StyleProperty('color', 'rgb(142 104 42)'),
            new StyleProperty('background-color', 'rgb(255 255 255 / 25%)'),
            new StyleProperty('padding', '6px 8px 6px 6px'),
        ]),
        new StyleSelector([
            '.fan-wall-post.discussions .act-drop .dropdown .option-btn:hover',
            '.fan-wall-post.discussions .act-drop .dropdown .option-btn:focus',
        ], [
            new StyleProperty('color', 'rgb(0 0 0 / 70%)'),
            new StyleProperty('background-color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul',
            'body.fb_layout .share.dropup ul'
        ], [
            new StyleProperty('padding', '0'),
            new StyleProperty('box-shadow', '0 0 12px 2px rgb(0 0 0 / 20%)'),
            new StyleProperty('border', '1px solid rgb(142 104 42)'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li',
            'body.fb_layout .share.dropup ul li',
        ], [
            new StyleProperty('border-bottom', '1px solid rgb(142 104 42 / 50%)'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li:last-child',
            'body.fb_layout .share.dropup ul li:last-child',
        ], [
            new StyleProperty('border-bottom', 'none'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li:first-child a',
            'body.fb_layout .share.dropup ul li:first-child a',
        ], [
            new StyleProperty('border-top-left-radius', '4px'),
            new StyleProperty('border-top-right-radius', '4px'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li:last-child a',
            'body.fb_layout .share.dropup ul li:first-child a',
        ], [
            new StyleProperty('border-bottom-left-radius', '4px'),
            new StyleProperty('border-bottom-right-radius', '4px'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li a',
            'body.fb_layout .share.dropup ul li a',
        ], [
            new StyleProperty('padding', '10px 18px'),
            new StyleProperty('top', 'auto'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li:hover a',
            'body.fb_layout .share.dropup ul li:hover a',
        ], [
            new StyleProperty('background-color', 'rgb(0 0 0 / 5%)'),
            new StyleProperty('color', 'rgb(0 0 0)'),
            new StyleProperty('font-weight', 'bold'),
            new StyleProperty('text-shadow', '0 0 4px rgb(255 255 255)'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a span', [
            new StyleProperty('padding-left', '3px'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a i.fa', [
            new StyleProperty('bottom', 'auto'),
            new StyleProperty('color', 'rgb(0 0 0)'),
            new StyleProperty('opacity', '0.5'),
            new StyleProperty('padding-right', '0'),
            new StyleProperty('font-size', '16px'),
            new StyleProperty('line-height', '14px'),
            new StyleProperty('width', '20px'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li:hover a i.fa', [
            new StyleProperty('opacity', '1.0'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a.copy-link i.fa', [
            new StyleProperty('height', '12px'),
            new StyleProperty('bottom', '6px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .msg-text', [
            new StyleProperty('padding-right', '12px'),
        ]),
        new StyleSelector('.pe-none', [
            new StyleProperty('pointer-events', 'auto'),
        ]),
        new StyleSelector('::-webkit-scrollbar', [
            new StyleProperty('width', '15px'),
            new StyleProperty('border', '1px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-track', [
            new StyleProperty('background', 'rgb(28 28 28 / 100%)'),
            new StyleProperty('border', '1px solid rgb(0 0 0)'),
            new StyleProperty('border-right', '1px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-thumb', [
            new StyleProperty('background', 'rgb(70 70 70 / 100%)'),
            new StyleProperty('border', '2px solid rgb(0 0 0)'),
            new StyleProperty('border-right', '2px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-thumb:hover', [
            new StyleProperty('background', 'rgb(90 90 90 / 100%)'),
            new StyleProperty('cursor', 'pointer'),
        ]),
        new StyleSelector('.full-loader', [
            new StyleProperty('background', 'rgb(0 0 0 / 70%)'),
            new StyleProperty('cursor', 'wait'),
        ]),
        new StyleSelector('.modal-open .modal', [
            new StyleProperty('background', 'rgb(0 0 0 / 70%)'),
        ]),
        new StyleSelector('#load_more', [
            new StyleProperty('margin-bottom', '36px'),
            new StyleProperty('padding', '36px 96px'),
            new StyleProperty('border', '2px solid rgb(255 255 255 / 25%)x'),
        ]),
        new StyleSelector([
            '.upper-heading .comment-reply-head',
            '.upper-heading .only-replies'
        ], [
            new StyleProperty('margin-right', '25px'),
            new StyleProperty('padding-right', '0'),
        ]),
        new StyleSelector('.modal-dialog .close.close-button-mymodel', [
            new StyleProperty('top', '0'),
            new StyleProperty('right', '0'),
            new StyleProperty('opacity', '0.7'),
        ]),
        new StyleSelector('.modal-dialog .close.close-button-mymodel:hover', [
            new StyleProperty('opacity', '1.0'),
        ]),
        new StyleSelector('.modal-content .full-detail', [
            new StyleProperty('border', '2px solid rgb(131 124 107 / 40%)'),
            new StyleProperty('border-bottom', 'none'),
            new StyleProperty('border-radius', '4px'),
        ]),
        new StyleSelector('.loader-background', [
            new StyleProperty('z-index', 'auto'),
        ]),
        new StyleSelector([
            '.fb_layout .post-panel .post-footer i',
            '.fb_layout .full-detail .left-side .action-area i',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 30%)', false),
        ]),
        new StyleSelector([
            '.fb_layout .post-panel .post-footer i:hover',
            '.fb_layout .post-panel .post-footer i:focus',
            '.fb_layout .full-detail .left-side .action-area i:hover',
            '.fb_layout .full-detail .left-side .action-area i:focus',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 45%)', false),
        ]),
        new StyleSelector([
            '.post-panel .post-footer .liked',
            '.post-panel .post-footer i.favorite-highlight',
            '.full-detail .left-side .action-area .liked',
            '.full-detail .left-side .action-area i.favorite-highlight',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector([
            '.post-panel .post-footer i.favorite-highlight:hover',
            '.post-panel .post-footer i.favorite-highlight:focus',
            '.full-detail .left-side .action-area i.favorite-highlight:hover',
            '.full-detail .left-side .action-area i.favorite-highlight:focus',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 75%)'),
        ]),
        new StyleSelector([
            '.like-btn.like-disable[like-type=""] i:hover',
            '.like-btn.like-disable[like-type=""] i:focus',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 30%)'),
        ]),
        new StyleSelector([
            '.post-panel .post-footer .like-btn.like-disable[like-type=""]',
            '.post-panel .post-footer .like-btn.like-disable[like-type=""] i',
            '.full-detail .left-side .action-area .like-btn.like-disable[like-type=""]',
            '.full-detail .left-side .action-area .like-btn.like-disable[like-type=""] i',
        ], [
            new StyleProperty('pointer-events', 'none'),
        ]),
        new StyleSelector([
            '.like-btn.like-disable[like-type=""] .multi-likes',
            '.like-btn.like-disable[like-type=""] .multi-likes',
        ], [
            new StyleProperty('display', 'none'),
        ]),
        new StyleSelector('.multi-likes', [
            new StyleProperty('width', 'auto'),
            new StyleProperty('left', '11px'),
            new StyleProperty('bottom', '33px'),
        ]),
        new StyleSelector('.full-detail .multi-likes', [
            new StyleProperty('left', '6px'),
            new StyleProperty('bottom', '36px'),
        ]),
        new StyleSelector('.img-full-mode', [
            new StyleProperty('height', 'calc(100% - 150px)'),
            new StyleProperty('width', 'calc(100% - 5px)'),
            new StyleProperty('top', '70px'),
            new StyleProperty('background', 'rgb(0 0 0 / 90%)'),
        ]),
        new StyleSelector('.fb_layout .more-comments', [
            new StyleProperty('color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector([
            '.fb_layout .more-comments:hover',
            '.fb_layout .more-comments:focus',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 80%)'),
            new StyleProperty('text-decoration', 'underline'),
        ]),
        new StyleSelector([
            '.fb-navigation .fb-navigation-menu a:hover',
            '.fb-navigation .dropdown-submenu a:hover',
            '.fb-navigation .nav-item .dropdown-submenu .dropdown-menu h5:hover',
            '.fb-navigation .fb-navigation-user .dropdown-menu a:hover',
            '.fb-navigation .dailydigest-check .check-text:hover',
            '.fb-navigation .fb-navigation-user .dropdown-menu a span:hover',
        ], [
            new StyleProperty('color', 'rgb(255 255 255 / 80%)'),
        ]),
        new StyleSelector([
            '.fb-navigation .fb-navigation-menu a',
            '.fb-navigation .dropdown-submenu a',
            '.fb-navigation .nav-item .dropdown-submenu .dropdown-menu h5',
            '.fb-navigation .fb-navigation-user .dropdown-menu a',
            '.fb-navigation .dailydigest-check .check-text',
            '.fb-navigation .fb-navigation-user .dropdown-menu a span',
        ], [
            new StyleProperty('transition', 'color 120ms ease-out, background-color 120ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-icons .direct_message_lnk svg', [
            new StyleProperty('width', '28px'),
            new StyleProperty('height', '22px'),
        ]),
        new StyleSelector('.fb-navigation-icons .direct_message_lnk .dm-unread-dot', [
            new StyleProperty('top', '-4pxpx'),
            new StyleProperty('right', '-7px'),
        ]),
        new StyleSelector('.forum-bar', [
            new StyleProperty('height', '56px'),
            new StyleProperty('border-bottom', '3px solid rgb(130 104 43 / 40%)'),
        ]),
        new StyleSelector('.forum-bar ul li a', [
            new StyleProperty('padding', '12px 20px 9px 20px'),
            new StyleProperty('margin', '0 6px'),
            new StyleProperty('background-color', 'rgb(255 255 255 / 0%)'),
            new StyleProperty('transition', 'color 280ms ease-in-out, border-color 320ms ease-in-out, background-color 240ms ease-out'),
        ]),
        new StyleSelector([
            '.forum-bar ul li a:hover',
            '.forum-bar ul li a.active'
        ], [
            new StyleProperty('background-color', 'rgb(255 255 255 / 3%)'),
        ]),
        new StyleSelector([
            'li',
            'a',
        ], [
            new StyleProperty('transition', 'color 120ms ease-out, background-color 120ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-user #my_profile img.user-icon', [
            new StyleProperty('border-radius', '100%'),
            new StyleProperty('border', '2px solid transparent'),
            new StyleProperty('transition', 'border-color 180ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-user:hover #my_profile img.user-icon', [
            new StyleProperty('border-color', 'rgb(255 255 255 / 75%)'),
        ]),
    ]);

    const styleDarker = new StyleConfigDarker([
        new StyleSelector('.fav-tabs', [
            new StyleProperty('background-color', 'rgb(254 254 254 / 2%)'),
            new StyleProperty('box-shadow', 'none'),
        ]),
        new StyleSelector('body.gray-bg', [
            new StyleProperty('background-color', 'rgb(12.5 12.5 12.5 / 96%)'),
        ]),
        new StyleSelector('.fb_layout .newfeeds-container .newfeeds-left .newfeed-userInfo', [
            new StyleProperty('background-color', 'rgb(255 255 255 / 85%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup', [
            new StyleProperty('background-color', 'rgb(255 255 255 / 85%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup .add-forum #makemojifield', [
            new StyleProperty('padding-top', '18px'),
            new StyleProperty('box-shadow', 'inset 0 0 1px 1px rgb(0 0 0 / 20%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup .frm-footer', [
            new StyleProperty('background-color', 'transparent'),
        ]),
        new StyleSelector('.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu:before', [
            new StyleProperty('background', 'none'),
        ]),
        new StyleSelector('.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a', [
            new StyleProperty('margin', '0'),
        ]),
        new StyleSelector([
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a:hover',
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a:active',
        ], [
            new StyleProperty('border-bottom', '1px solid #ccc'),
        ]),
        new StyleSelector([
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li:last-child a:hover',
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li:last-child a:active',
        ], [
            new StyleProperty('border-bottom', 'none'),
        ]),
        new StyleSelector([
            'body.fb_layout .newfeeds-left .forum-bar .newfeed-leftBox .dropdown .dropdown-toggle',
            'body.fb_layout .newfeed-leftBox.newfeed-seachBox .form-control',
            'body.fb_layout .newfeed-leftBox .post-panel',
        ], [
            new StyleProperty('background-color', 'rgb(241 240 240 / 85%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions', [
            new StyleProperty('border-color', 'rgb(15 15 15)'),
            new StyleProperty('background-color', 'rgb(255 255 255 / 75%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li', [
            new StyleProperty('background-color', 'rgb(15 11 14 / 30%)'),
            new StyleProperty('border-left', '4px solid rgb(0 0 0 / 36%)'),
            new StyleProperty('border-right', '4px solid rgb(0 0 0 / 36%)'),
            new StyleProperty('transition', 'background-color 280ms ease-out'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus',
        ], [
            new StyleProperty('background-color', 'rgb(16 11 14 / 25%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li p', [
            new StyleProperty('color', 'rgb(54 54 54)'),
            new StyleProperty('text-shadow', '0 0'),
            new StyleProperty('text-shadow-color', 'rgb(0 0 0 / 2.5%)'),
            new StyleProperty('transition', 'color 220ms ease-out, text-shadow-color 220ms ease-out'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover p',
        ], [
            new StyleProperty('color', 'rgb(14 14 14)'),
            new StyleProperty('text-shadow-color', 'rgb(0 0 0 / 100%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read', [
            new StyleProperty('background-color', 'rgb(142 104 42 / 77.5%)'),
            new StyleProperty('border-left-color', 'rgb(109 74 16)'),
            new StyleProperty('border-right-color', 'rgb(109 74 16)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p',
        ], [
            new StyleProperty('text-shadow-color', 'rgb(0 0 0 / 80%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus',
        ], [
            new StyleProperty('background-color', 'rgb(142 104 42 / 62.5%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus p',
        ], [
            new StyleProperty('color', 'rgb(24 24 24)'),
        ]),
    ]);

    const log = new ConsoleLogger(verbosityLevelActive);

    /* setup function definitions */

    const setupPageEventPostsExpand = (selectorList, eventType = 'dblclick') => {
        const postsSelectorList = StyleSelector.selectorArrayToString(
            selectorList.map((selector) => `${selector} .post-panel`)
        );

        jq(postsSelectorList).each((index, panel) => {
            panel = jq(panel);

            log.info(`(INIT) Posts expand: attaching "${eventType}" event to:`, panel);

            try {
                panel.unbind(eventType);
            } catch(e) {
                log.warn('(INIT) Posts expand: unable to unbind event:', e);
            } finally {
                panel.bind(eventType, (event) => {
                    try {
                        let target = jq(event.currentTarget);
                        let button = target.find('> .post-footer > .comment > i');

                        log.info('(EVNT) Posts expand: triggered event element:', target);
                        log.info('(EVNT) Posts expand: clicking button element:', button);

                        button.click();
                    } catch(e) {
                        log.fail('(EVNT) Posts expand: failed to handle event:', e);
                    }
                });
            }
        });
    };

    const setupObserversPostsExpand = (selectorList) => {
        try {
            const pagePostsObserver = new MutationObserver(() => {
                setupPageEventPostsExpand();
            });

            pagePostsObserver.observe(
                document.querySelector(
                    StyleSelector.selectorArrayToString(selectorList)
                ), {
                    childList : true,
                    attributes: false,
                    subtree   : false,
                }
            );
        } catch(e) {
            log.warn('(INIT) Failed setting up page mutation observers ...', e);
        }
    };

    const setupPageEventModalCloses = (selectorList, eventType = 'dblclick') => {
        jq(StyleSelector.selectorArrayToString(selectorList)).each((index, modal) => {
            modal = jq(modal);

            log.info(`(INIT) Modal closes: attaching "${eventType}" event to:`, modal);

            try {
                modal.unbind(eventType)
            } catch(e) {
                log.warn('(INIT) Post double-click expand: unable to unbind event:', e);
            } finally {
                modal.bind(eventType, (event) => {
                    try {
                        const target = jq(event.currentTarget);
                        const button = target.find('.modal-dialog button.close');

                        log.info('(EVNT) Modal closes: triggered event element:', target);
                        log.info('(EVNT) Modal closes: clicking button element:', button);

                        button.click()
                    } catch(e) {
                        log.fail('(EVNT) Modal closes: failed to handle event:', e);
                    }
                });
            }
        });
    };

    const setupPageEvents = () => {
        const modalContainerSelectorList = [
            '.modal'
        ];
        const panelContainerSelectorList = [
            '.published-card-section.user-profile-page .post-panels',
            '.newfeeds-container .published-card-section.card-section .post-panels'
        ];

        log.info('(INIT) Setting up page element events ...');

        setupPageEventModalCloses(modalContainerSelectorList);
        setupPageEventPostsExpand(panelContainerSelectorList);
        setupObserversPostsExpand(panelContainerSelectorList);

        log.info('(INIT) Setting up page mutation observers ...');
    };

    const setupPageStyles = () => {
        const finalStyleConfig = stylingDarkerEnable
            ? styleNormal.mergeStyleConfig(styleDarker)
            : styleNormal;

        log.info('(INIT) Setting up cust page element styling ...');

        finalStyleConfig.getStyleList().forEach((style) => {
            try {
                GM_addStyle(style.stringify());
                log.info(`(INIT) Adding new "${finalStyleConfig.getStyleType()}" style => [ ${style.stringify()} ]`);
            } catch(e) {
                log.fail(`(INIT) Failed new "${finalStyleConfig.getStyleType()}" style => [ ${style.stringify()} ]`, e);
            }
        });
    };

    const setupInjectionsMessagesIcon = () => {
        const pageMessagesIcon = jq('.fb-navigation-icons a.navbar-dm-icon');

        log.info('(INIT) Injecting SVG version of messages icon ...');

        try {
            pageMessagesIcon.find('img').remove();
            pageMessagesIcon.prepend(mailIconSvgImage);
        } catch(e) {
            log.fail('(INIT) Failed injecting SVG version of message icon ...', e);
        }
    };

    const setupInjections = () => {
        log.info('(INIT) Setting up page injections ...');

        setupInjectionsMessagesIcon();
    };

    /* invoke functions that do not require page load event to fire */

    log.info('(MAIN) Executing initialization functions ...');
    setupPageStyles();
    log.info('(MAIN) Completed initialization functions ...');

    /* invoke functions that require page load event had been fired */

    window.addEventListener('load', () => {
        log.info('(LOAD) Executing initialization functions ...');
        setupPageEvents();
        setupInjections();
        log.info('(LOAD) Completed initialization functions ...');
    }, false);

})(window.jQuery);
