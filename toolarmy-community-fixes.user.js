// ==UserScript==
// @name         Tool Army Community Fixes
// @namespace    https://github.com/robfrawley/toolarmy-community-fixes
// @version      0.6.1
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
        static trimValueList(array) {
            return Normalizer.toArray(array).map((value) => String(value).trim());
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
            this._styleName = this._normalizeStyleNameInput(styleName);
            this._styleVals = this._normalizeStyleValsInput(styleVals);
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
            if (this._styleName !== mergingStyleProperty.getStyleName()) {
                throw new Error(`Merged style property names do not match: ${this._styleName} !== ${mergingStyleProperty.getStyleName()}`);
            }

            this._styleVals = mergingStyleProperty.getStyleVals();
            this._important = mergingStyleProperty.isStyleImportant();

            return this;
        }

        _normalizeStyleNameInput(value) {
            return this._normalizeInput(value);
        }

        _normalizeStyleValsInput(value) {
            return this._normalizeInput(value)
                .replace(/;$/, '')
                .replace(/ ?!important$/, '');
        }

        _normalizeInput(value) {
            return Normalizer.toString(value, this).trim().toLowerCase();
        }
    }

    class StylePropertyImpt extends StyleProperty {
        constructor(styleName, styleVals) {
            super(styleName, styleVals, true);
        }
    }

    class StylePropertyNorm extends StyleProperty {
        constructor(styleName, styleVals) {
            super(styleName, styleVals, false);
        }
    }

    class StyleSelector {
        constructor(selectors, propsList, prettyOut = false) {
            this._selectors = this._normalizeSelectorsInput(selectors);
            this._propsList = this._normalizePropsListInput(propsList);
            this._prettyOut = prettyOut;
        }

        mergeStyleSelector(mergingStyleSelector, inclusiveCheck = false) {
            const currentStyleMap = this.getPropsList();
            const mergingStyleMap = mergingStyleSelector.getPropsList();

            this._propsList = [...currentStyleMap.map((currentStyleProperty) => {
                for (let i = 0; i < mergingStyleMap.length; i++) {
                    const mergingStyleProperty = mergingStyleMap[i];

                    if (currentStyleProperty.getStyleName() === mergingStyleProperty.getStyleName()) {
                        currentStyleProperty.mergeStyleProperty(mergingStyleProperty);
                        mergingStyleMap.splice(i, 1);
                    }
                }

                return currentStyleProperty;
            }), ...mergingStyleMap];

            return this;
        }

        getPropsList() {
            return this._propsList;
        }

        stringify() {
            const selectors = this.stringifySelectors();
            const styleDefs = this._prettyOut
                ? `\n${this.stringifyPropsList()}\n`
                : this.stringifyPropsList();

            return `${selectors} { ${styleDefs} }`
        }

        stringifySelectors() {
            return StyleSelector.selectorsToString(
                this._selectors, this._prettyOut ? ',\n' : ', '
            );
        }

        stringifyPropsList() {
            return this._propsList.map((style) => {
                return this._prettyOut ? `\t${style.stringify()};` : `${style.stringify()};`;
            }).join(this._prettyOut ? '\n' : ' ');
        }

        static selectorsToString(selectors, glue = ', ') {
            return Normalizer.trimValueList(selectors).join(glue);
        }

        _normalizeSelectorsInput(value) {
            return Normalizer.trimValueList(Normalizer.toArray(value));
        }

        _normalizePropsListInput(value) {
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
            const currentStyleList = this._styleList;
            const mergingStyleList = mergingStyleConfig.getStyleList();

            this._styleType += `+${mergingStyleConfig.getStyleType()}`;
            this._styleList = [...currentStyleList.map((currentStyleSelector) => {
                for (let i = 0; i < mergingStyleList.length; i++) {
                    const mergingStyleSelector = mergingStyleList[i];

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
            new StylePropertyImpt('margin-right', '4px'),
        ]),
        new StyleSelector('.fb-navigation-icons > ul > li:hover a svg', [
            new StylePropertyImpt('filter', 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(1910%) hue-rotate(339deg) brightness(120%) contrast(75%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions', [
            new StylePropertyImpt('border', '4px solid rgb(0 0 0 / 50%)'),
            new StylePropertyImpt('border-left', 'none'),
            new StylePropertyImpt('border-right', 'none'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li', [
            new StylePropertyImpt('background-color', 'rgb(0 0 0 / 20%)'),
            new StylePropertyImpt('border-left', '4px solid rgb(0 0 0 / 25%)'),
            new StylePropertyImpt('border-right', '4px solid rgb(0 0 0 / 25%)'),
            new StylePropertyImpt('margin-bottom', '2px'),
            new StylePropertyImpt('padding', '1em'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li:first-child', [
            new StylePropertyImpt('margin-top', '2px'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus',
        ], [
            new StylePropertyImpt('background-color', 'rgb(0 0 0 / 22.5%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read', [
            new StylePropertyImpt('background-color', 'rgb(142 104 42 / 50%)'),
            new StylePropertyImpt('border-left-color', 'rgb(142 104 42 / 95%)'),
            new StylePropertyImpt('border-right-color', 'rgb(142 104 42 / 95%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus',
        ], [
            new StylePropertyImpt('background-color', 'rgb(142 104 42 / 55%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .profile-pic', [
            new StylePropertyImpt('margin', '1em 1.5em 1em 0.5em'),
            new StylePropertyImpt('border', '2px solid rgb(255 255 255 / 80%)'),
            new StylePropertyImpt('box-shadow', '0 0 0 4px rgb(0 0 0 / 40%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read .profile-pic', [
            new StylePropertyImpt('box-shadow', '0 0 0 4px rgb(39 31 19 / 80%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .content', [
            new StylePropertyImpt('border-bottom', 'none'),
            new StylePropertyImpt('margin', '0'),
            new StylePropertyImpt('padding', '1.0em 0 1.0em 0'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li p:first-child', [
            new StylePropertyImpt('font-size', '1.2em'),
            new StylePropertyImpt('margin-bottom', '0.25em'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p:first-child', [
            new StylePropertyImpt('font-weight', '500'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li .content .time', [
            new StylePropertyImpt('float', 'none'),
            new StylePropertyImpt('margin', '0'),
            new StylePropertyImpt('padding', '0'),
        ]),
        new StyleSelector('.upper-heading .comment-reply-head .vote-btn.notification-view-post', [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 50%)'),
        ]),
        new StyleSelector([
            '.fb_layout.modal-open .modal-content .card-data .full-detail .vote-btn:hover',
            '.fb_layout.modal-open .modal-content .card-data .full-detail .vote-btn:focus',
        ], [
            new StylePropertyImpt('border-color', 'rgb(255 255 255 / 70%)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 5%)'),
            new StylePropertyImpt('color', 'rgb(255 255 255 / 70%)'),
        ]),
        new StyleSelector('.previous-comment-btn span.previous-comment-link', [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 30%)'),
        ]),
        new StyleSelector([
            '.previous-comment-btn span.previous-comment-link:hover',
            '.previous-comment-btn span.previous-comment-link:active ',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 50%)'),
        ]),
        new StyleSelector('.fb_layout .comment-form-outer .messages-box', [
            new StylePropertyImpt('padding', '10px'),
        ]),
        new StyleSelector('#myModal .modal-content .card-data .comment-form-outer .messages-box', [
            new StylePropertyImpt('padding-right', '4px'),
        ]),
        new StyleSelector('.messages-box .showPlaceholder:before', [
            new StylePropertyImpt('cursor', 'text'),
        ]),
        new StyleSelector([
            '.fb_layout .messages-box textarea',
            '.fb_layout .messages-box #makemojifield',
        ], [
            new StylePropertyImpt('max-height', 'none'),
            new StylePropertyImpt('border', '2px solid rgb(0 0 0 / 75%)'),
            new StylePropertyImpt('border-radius', '3px'),
            new StylePropertyImpt('box-shadow', 'inset 0 0 8px 1px rgb(255 255 255 / 90%)'),
            new StylePropertyImpt('cursor', 'text'),
            new StylePropertyImpt('padding', '8px 10px 5px 10px'),
            new StylePropertyImpt('background', 'rgb(255 255 255 / 80%)'),
        ]),
        new StyleSelector([
            '.fb_layout .messages-box textarea:focus',
            '.fb_layout .messages-box #makemojifield:focus',
        ], [
            new StylePropertyImpt('background', 'rgb(255 255 255 / 98%)'),
        ]),
        new StyleSelector([
            '.fb_layout .newfeeds-right .add-forum .form-control',
            '.fb_layout .newfeeds-right .add-forum #makemojifield',
        ], [
            new StylePropertyImpt('height', 'auto'),
        ]),
        new StyleSelector([
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon'
        ], [
            new StylePropertyImpt('top', '11px'),
            new StylePropertyImpt('right', '12px'),
            new StylePropertyImpt('font-size', '18px'),
            new StylePropertyImpt('font-weight', 'bold'),
            new StylePropertyImpt('color', 'rgb(61 60 59 / 50%)'),
            new StylePropertyImpt('text-shadow', '0 0 9px rgb(255 255 255)'),
        ]),
        new StyleSelector([
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon:hover',
            '.fb_layout .comment-form-outer .messages-box .icon-cam_icon:focus',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon:hover',
            '.fb_layout .modal-content .comment-form-outer .messages-box .icon-cam_icon:focus',
        ], [
            new StylePropertyImpt('color', 'rgb(61 60 59 / 100%)'),
        ]),
        new StyleSelector('.fan-wall-post.discussions .act-drop .dropdown', [
            new StylePropertyImpt('top', '-50%'),
        ]),
        new StyleSelector('.fan-wall-post.discussions .act-drop .dropdown .option-btn', [
            new StylePropertyImpt('color', 'rgb(142 104 42)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 25%)'),
            new StylePropertyImpt('padding', '6px 8px 6px 6px'),
        ]),
        new StyleSelector([
            '.fan-wall-post.discussions .act-drop .dropdown .option-btn:hover',
            '.fan-wall-post.discussions .act-drop .dropdown .option-btn:focus',
        ], [
            new StylePropertyImpt('color', 'rgb(0 0 0 / 70%)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li a',
            'body.fb_layout .share.dropup ul li a',
        ], [
            new StylePropertyImpt('padding', '10px 18px'),
            new StylePropertyImpt('top', 'auto'),
        ]),
        new StyleSelector([
            'body.fb_layout .act-drop .dropdown ul li:hover a',
            'body.fb_layout .share.dropup ul li:hover a',
        ], [
            new StylePropertyImpt('background-color', 'rgb(0 0 0 / 5%)'),
            new StylePropertyImpt('color', 'rgb(0 0 0)'),
            new StylePropertyImpt('font-weight', 'bold'),
            new StylePropertyImpt('text-shadow', '0 0 4px rgb(255 255 255)'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a span', [
            new StylePropertyImpt('padding-left', '3px'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a i.fa', [
            new StylePropertyImpt('bottom', 'auto'),
            new StylePropertyImpt('color', 'rgb(0 0 0)'),
            new StylePropertyImpt('opacity', '0.5'),
            new StylePropertyImpt('padding-right', '0'),
            new StylePropertyImpt('font-size', '16px'),
            new StylePropertyImpt('line-height', '14px'),
            new StylePropertyImpt('width', '20px'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li:hover a i.fa', [
            new StylePropertyImpt('opacity', '1.0'),
        ]),
        new StyleSelector('body.fb_layout .share.dropup ul li a.copy-link i.fa', [
            new StylePropertyImpt('height', '12px'),
            new StylePropertyImpt('bottom', '6px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .msg-text', [
            new StylePropertyImpt('padding-right', '12px'),
        ]),
        new StyleSelector('.pe-none', [
            new StylePropertyImpt('pointer-events', 'auto'),
        ]),
        new StyleSelector('::-webkit-scrollbar', [
            new StylePropertyImpt('width', '15px'),
            new StylePropertyImpt('border', '1px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-track', [
            new StylePropertyImpt('background', 'rgb(28 28 28 / 100%)'),
            new StylePropertyImpt('border', '1px solid rgb(0 0 0)'),
            new StylePropertyImpt('border-right', '1px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-thumb', [
            new StylePropertyImpt('background', 'rgb(70 70 70 / 100%)'),
            new StylePropertyImpt('border', '2px solid rgb(0 0 0)'),
            new StylePropertyImpt('border-right', '2px solid rgb(0 0 0)'),
        ]),
        new StyleSelector('::-webkit-scrollbar-thumb:hover', [
            new StylePropertyImpt('background', 'rgb(90 90 90 / 100%)'),
            new StylePropertyImpt('cursor', 'pointer'),
        ]),
        new StyleSelector('.full-loader', [
            new StylePropertyImpt('background', 'rgb(0 0 0 / 70%)'),
            new StylePropertyImpt('cursor', 'wait'),
        ]),
        new StyleSelector('.modal-open .modal', [
            new StylePropertyImpt('background', 'rgb(0 0 0 / 70%)'),
        ]),
        new StyleSelector('#load_more', [
            new StylePropertyImpt('margin-bottom', '36px'),
            new StylePropertyImpt('padding', '36px 96px'),
            new StylePropertyImpt('border', '2px solid rgb(255 255 255 / 25%)x'),
        ]),
        new StyleSelector([
            '.upper-heading .comment-reply-head',
            '.upper-heading .only-replies'
        ], [
            new StylePropertyImpt('margin-right', '25px'),
            new StylePropertyImpt('padding-right', '0'),
        ]),
        new StyleSelector('.modal-dialog .close.close-button-mymodel', [
            new StylePropertyImpt('top', '0'),
            new StylePropertyImpt('right', '0'),
            new StylePropertyImpt('opacity', '0.7'),
        ]),
        new StyleSelector('.modal-dialog .close.close-button-mymodel:hover', [
            new StylePropertyImpt('opacity', '1.0'),
        ]),
        new StyleSelector('.modal-content .full-detail', [
            new StylePropertyImpt('border', '2px solid rgb(131 124 107 / 40%)'),
            new StylePropertyImpt('border-bottom', 'none'),
            new StylePropertyImpt('border-radius', '4px'),
        ]),
        new StyleSelector('.loader-background', [
            new StylePropertyImpt('z-index', 'auto'),
        ]),
        new StyleSelector([
            '.fb_layout .post-panel .post-footer i',
            '.fb_layout .full-detail .left-side .action-area i',
        ], [
            new StylePropertyNorm('color', 'rgb(255 255 255 / 30%)'),
        ]),
        new StyleSelector([
            '.fb_layout .post-panel .post-footer i:hover',
            '.fb_layout .post-panel .post-footer i:focus',
            '.fb_layout .full-detail .left-side .action-area i:hover',
            '.fb_layout .full-detail .left-side .action-area i:focus',
        ], [
            new StylePropertyNorm('color', 'rgb(255 255 255 / 45%)'),
        ]),
        new StyleSelector([
            '.post-panel .post-footer .liked',
            '.post-panel .post-footer i.favorite-highlight',
            '.full-detail .left-side .action-area .liked',
            '.full-detail .left-side .action-area i.favorite-highlight',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector([
            '.post-panel .post-footer i.favorite-highlight:hover',
            '.post-panel .post-footer i.favorite-highlight:focus',
            '.full-detail .left-side .action-area i.favorite-highlight:hover',
            '.full-detail .left-side .action-area i.favorite-highlight:focus',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 75%)'),
        ]),
        new StyleSelector([
            '.like-btn.like-disable[like-type=""] i:hover',
            '.like-btn.like-disable[like-type=""] i:focus',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 30%)'),
        ]),
        new StyleSelector([
            '.post-panel .post-footer .like-btn.like-disable[like-type=""]',
            '.post-panel .post-footer .like-btn.like-disable[like-type=""] i',
            '.full-detail .left-side .action-area .like-btn.like-disable[like-type=""]',
            '.full-detail .left-side .action-area .like-btn.like-disable[like-type=""] i',
        ], [
            new StylePropertyImpt('pointer-events', 'none'),
        ]),
        new StyleSelector([
            '.like-btn.like-disable[like-type=""] .multi-likes',
            '.like-btn.like-disable[like-type=""] .multi-likes',
        ], [
            new StylePropertyImpt('display', 'none'),
        ]),
        new StyleSelector('.multi-likes', [
            new StylePropertyImpt('width', 'auto'),
            new StylePropertyImpt('left', '11px'),
            new StylePropertyImpt('bottom', '33px'),
        ]),
        new StyleSelector('.full-detail .multi-likes', [
            new StylePropertyImpt('left', '6px'),
            new StylePropertyImpt('bottom', '36px'),
        ]),
        new StyleSelector('.img-full-mode', [
            new StylePropertyImpt('height', 'calc(100% - 150px)'),
            new StylePropertyImpt('width', 'calc(100% - 5px)'),
            new StylePropertyImpt('top', '70px'),
            new StylePropertyImpt('background', 'rgb(0 0 0 / 90%)'),
        ]),
        new StyleSelector('.fb_layout .more-comments', [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 60%)'),
            new StylePropertyImpt('text-align', 'center'),
            new StylePropertyImpt('padding', '20px 0 0 0'),
        ]),
        new StyleSelector([
            '.fb_layout .more-comments:hover',
            '.fb_layout .more-comments:focus',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 75%)'),
        ]),
        new StyleSelector([
            '.fb-navigation .fb-navigation-menu a:hover',
            '.fb-navigation .dropdown-submenu a:hover',
            '.fb-navigation .nav-item .dropdown-submenu .dropdown-menu h5:hover',
            '.fb-navigation .fb-navigation-user .dropdown-menu a:hover',
            '.fb-navigation .dailydigest-check .check-text:hover',
            '.fb-navigation .fb-navigation-user .dropdown-menu a span:hover',
        ], [
            new StylePropertyImpt('color', 'rgb(255 255 255 / 80%)'),
        ]),
        new StyleSelector([
            '.fb-navigation .fb-navigation-menu a',
            '.fb-navigation .dropdown-submenu a',
            '.fb-navigation .nav-item .dropdown-submenu .dropdown-menu h5',
            '.fb-navigation .fb-navigation-user .dropdown-menu a',
            '.fb-navigation .dailydigest-check .check-text',
            '.fb-navigation .fb-navigation-user .dropdown-menu a span',
        ], [
            new StylePropertyImpt('transition', 'color 120ms ease-out, background-color 120ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-icons .direct_message_lnk svg', [
            new StylePropertyImpt('width', '28px'),
            new StylePropertyImpt('height', '22px'),
        ]),
        new StyleSelector('.fb-navigation-icons .direct_message_lnk .dm-unread-dot', [
            new StylePropertyImpt('top', '-4pxpx'),
            new StylePropertyImpt('right', '-7px'),
        ]),
        new StyleSelector('.forum-bar', [
            new StylePropertyImpt('height', '56px'),
            new StylePropertyImpt('border-bottom', '3px solid rgb(130 104 43 / 40%)'),
        ]),
        new StyleSelector('.forum-bar ul li a', [
            new StylePropertyImpt('padding', '12px 20px 9px 20px'),
            new StylePropertyImpt('margin', '0 6px'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 0%)'),
            new StylePropertyImpt('transition', 'color 280ms ease-in-out, border-color 320ms ease-in-out, background-color 240ms ease-out'),
        ]),
        new StyleSelector([
            '.forum-bar ul li a:hover',
            '.forum-bar ul li a.active'
        ], [
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 3%)'),
        ]),
        new StyleSelector([
            'li',
            'a',
        ], [
            new StylePropertyImpt('transition', 'color 120ms ease-out, background-color 120ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-user #my_profile img.user-icon', [
            new StylePropertyImpt('border-radius', '100%'),
            new StylePropertyImpt('border', '2px solid transparent'),
            new StylePropertyImpt('transition', 'border-color 180ms ease-out'),
        ]),
        new StyleSelector('.fb-navigation-user:hover #my_profile img.user-icon', [
            new StylePropertyImpt('border-color', 'rgb(255 255 255 / 75%)'),
        ]),
        new StyleSelector([
            '.full-detail .left-side .messages .set .msg-text, .comment-content .msg-text',
            '.full-detail figure.upload-img.enable-img-full-mode',
            '.newfeeds-container .listMessages figure.upload-img',
            
            '.fb_layout .newfeeds-container .comment-content .name.msg-user-name',
            '.fb_layout .modal-content .full-detail .comment-content .name.msg-user-name',
        ], [
            new StylePropertyImpt('background-color', 'rgb(106 109 120 / 80%)'),
        ]),
        new StyleSelector('.fb_layout .comment-content .text-con', [
            new StylePropertyImpt('background-color', 'rgb(137 138 147 / 15%)'),
            new StylePropertyImpt('padding-bottom', '4px'),
            new StylePropertyImpt('box-shadow', '0 10px 10px 0 rgb(0 0 0 / 10%)'),
            new StylePropertyImpt('border', '1px solid rgb(0 0 0 / 50%)'),
        ]),
        new StyleSelector('.fb_layout .comment-content .option-area', [
            new StylePropertyImpt('margin', '6px 0 0 10px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .option-area .share', [
            new StylePropertyImpt('margin-top', '2px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .like-batch.comment-react-list', [
            new StylePropertyImpt('height', '18px'),
            new StylePropertyImpt('bottom', '-4px'),
            new StylePropertyImpt('opacity', '0.85'),
            new StylePropertyImpt('box-shadow', '0 2px 1px 0 black'),
            new StylePropertyImpt('transition', 'opacity 140ms ease-out'),
        ]),
        new StyleSelector('.fb_layout .comment-content .like-batch.comment-react-list:hover', [
            new StylePropertyImpt('opacity', '1.0'),
        ]),
        new StyleSelector('.fb_layout .comment-content .like-batch.comment-react-list:hover span', [
            new StylePropertyImpt('color', 'rgb(0 0 0 / 80%)'),
        ]),
        new StyleSelector('.fb_layout .like-batch .count-message', [
            new StylePropertyImpt('top', '0px'),
        ]),
        new StyleSelector('.fb_layout .like-batch .fa', [
            new StylePropertyImpt('top', '-3px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content:has(.comment-replies .comment-content)', [
            new StylePropertyImpt('margin-top', '4px'),
            new StylePropertyImpt('border-top', '2px solid rgb(0 0 0 / 25%) !important'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content:has(.comment-replies .comment-content) .load-more-replies', [
            new StylePropertyImpt('margin', '0'),
            new StylePropertyImpt('padding', '10px 0 10px 0'),
            new StylePropertyImpt('text-align', 'center'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content:has(.comment-replies .comment-content) .load-more-replies span', [
            new StylePropertyImpt('color', 'rgb(193 200 207 / 50%)'),
            new StylePropertyImpt('font-weight', 'normal'),
            new StylePropertyImpt('text-shadow', '0 0 1px rgb(0 0 0)'),
            new StylePropertyImpt('width', '100%'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content:has(.comment-replies .comment-content) .load-more-replies:hover span', [
            new StylePropertyImpt('color', 'rgb(193 200 207 / 75%)'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content .comment-replies:has(.comment-content) .comment-content', [
            new StylePropertyImpt('margin', '12px 10px 10px 10px'),
            new StylePropertyImpt('padding', '0 0 0 1px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content .comment-replies:has(.comment-content) .comment-content:first-child', [
            new StylePropertyImpt('margin-top', '12px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content .comment-replies:has(.comment-content) .comment-content:last-child', [
            new StylePropertyImpt('margin-bottom', '7px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content .comment-replies:has(.comment-content) .comment-content:nth-last-child(2)', [
            new StylePropertyImpt('margin-bottom', '10px'),
        ]),
        new StyleSelector('.fb_layout .messages > .messages-text > .comment-content:nth-last-child(2)', [
            new StylePropertyImpt('margin-bottom', '20px'),
        ]),
        new StyleSelector('.fb_layout .comment-content .replies-content .comment-replies:has(.comment-content) .comment-content .user-image', [
            new StylePropertyImpt('margin-top', '2px'),
        ]),
        new StyleSelector('.fb_layout .full-detail .messages', [
            new StylePropertyImpt('padding-bottom', '0'),
            new StylePropertyImpt('margin-bottom', '0'),
        ]),
        new StyleSelector('.fb_layout .full-detail .messages .comment-content', [
            new StylePropertyImpt('padding', '0 0 20px 10px'),
        ]),
        new StyleSelector('.fb_layout .full-detail .messages .comment-content .card-user', [
            new StylePropertyImpt('padding', '0'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu', [
//            new StylePropertyImpt('padding', '0'),
            new StylePropertyImpt('box-shadow', '0 12px 14px 2px rgb(0 0 0 / 20%)'),
//            new StylePropertyImpt('border', '1px solid rgb(142 104 42)'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu li', [
            new StylePropertyImpt('color', 'rgb(142 104 42)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 25%)'),
            new StylePropertyImpt('border-bottom', '1px solid rgb(142 104 42 / 50%)'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu li:hover', [
            new StylePropertyImpt('color', 'rgb(0 0 0 / 30%)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 60%)'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu li:last-child', [
            new StylePropertyImpt('border-bottom', 'none'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu li:first-child a', [
            new StylePropertyImpt('border-top-left-radius', '4px'),
            new StylePropertyImpt('border-top-right-radius', '4px'),
        ]),
        new StyleSelector('.fb_layout .dropdown-menu li:last-child a', [
            new StylePropertyImpt('border-bottom-left-radius', '4px'),
            new StylePropertyImpt('border-bottom-right-radius', '4px'),
        ]),
        new StyleSelector('.full-detail .left-side .action-area', [
            new StylePropertyImpt('border-bottom', 'none'),
        ]),
        new StyleSelector('.full-detail .left-side .comment-sort', [
            new StylePropertyImpt('border-bottom', 'none'),
        ]),
    ]);

    const styleDarker = new StyleConfigDarker([
        new StyleSelector('.fav-tabs', [
            new StylePropertyImpt('background-color', 'rgb(254 254 254 / 2%)'),
            new StylePropertyImpt('box-shadow', 'none'),
        ]),
        new StyleSelector('body.gray-bg', [
            new StylePropertyImpt('background-color', 'rgb(12.5 12.5 12.5 / 96%)'),
        ]),
        new StyleSelector('.fb_layout .newfeeds-container .newfeeds-left .newfeed-userInfo', [
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 85%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup', [
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 85%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup .add-forum #makemojifield', [
            new StylePropertyImpt('padding-top', '18px'),
            new StylePropertyImpt('box-shadow', 'inset 0 0 1px 1px rgb(0 0 0 / 20%)'),
        ]),
        new StyleSelector('.fb_layout .forum-popup .frm-footer', [
            new StylePropertyImpt('background-color', 'transparent'),
        ]),
        new StyleSelector('.forum-bar', [
            new StylePropertyImpt('box-shadow', '0 14px 14px 0 rgb(0 0 0 / 10%)'),
        ]),
        new StyleSelector('.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu:before', [
            new StylePropertyImpt('background', 'none'),
        ]),
        new StyleSelector('.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a', [
            new StylePropertyImpt('margin', '0'),
        ]),
        new StyleSelector([
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a:hover',
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li a:active',
        ], [
            new StylePropertyImpt('border-bottom', '1px solid #ccc'),
        ]),
        new StyleSelector([
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li:last-child a:hover',
            '.fb_layout .forum-bar .filter-forum-by-type .dropdown-menu li:last-child a:active',
        ], [
            new StylePropertyImpt('border-bottom', 'none'),
        ]),
        new StyleSelector([
            'body.fb_layout .newfeeds-left .forum-bar .newfeed-leftBox .dropdown .dropdown-toggle',
            'body.fb_layout .newfeed-leftBox.newfeed-seachBox .form-control',
            'body.fb_layout .newfeed-leftBox .post-panel',
        ], [
            new StylePropertyImpt('background-color', 'rgb(241 240 240 / 85%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions', [
            new StylePropertyImpt('border-color', 'rgb(15 15 15)'),
            new StylePropertyImpt('background-color', 'rgb(255 255 255 / 65%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li', [
            new StylePropertyImpt('background-color', 'rgb(15 11 14 / 27%)'),
            new StylePropertyImpt('border-left', '4px solid rgb(0 0 0 / 36%)'),
            new StylePropertyImpt('border-right', '4px solid rgb(0 0 0 / 36%)'),
            new StylePropertyImpt('transition', 'background-color 280ms ease-out'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus',
        ], [
            new StylePropertyImpt('background-color', 'rgb(16 11 14 / 22%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li p', [
            new StylePropertyImpt('color', 'rgb(54 54 54)'),
            new StylePropertyImpt('text-shadow', '0 0'),
            new StylePropertyImpt('text-shadow-color', 'rgb(0 0 0 / 2.5%)'),
            new StylePropertyImpt('transition', 'color 220ms ease-out, text-shadow-color 220ms ease-out'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:focus p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li:hover p',
        ], [
            new StylePropertyImpt('color', 'rgb(14 14 14)'),
            new StylePropertyImpt('text-shadow-color', 'rgb(0 0 0 / 100%)'),
        ]),
        new StyleSelector('.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read', [
            new StylePropertyImpt('background-color', 'rgb(142 104 42 / 72.5%)'),
            new StylePropertyImpt('border-left-color', 'rgb(109 74 16)'),
            new StylePropertyImpt('border-right-color', 'rgb(109 74 16)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read p',
        ], [
            new StylePropertyImpt('text-shadow-color', 'rgb(0 0 0 / 80%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus',
        ], [
            new StylePropertyImpt('background-color', 'rgb(142 104 42 / 60%)'),
        ]),
        new StyleSelector([
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:hover p',
            '.fan-wall.activity-panel .fan-wall-post.discussions > li.un-read:focus p',
        ], [
            new StylePropertyImpt('color', 'rgb(24 24 24)'),
        ]),
    ]);

    const log = new ConsoleLogger(verbosityLevelActive);

    /* setup function definitions */

    const setupPageEventPostsExpand = (selectorList, eventType = 'dblclick') => {
        const postsSelectorList = StyleSelector.selectorsToString(
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
                        const target = jq(event.currentTarget);
                        const button = target.find('> .post-footer > .comment > i');

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
                    StyleSelector.selectorsToString(selectorList)
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
        jq(StyleSelector.selectorsToString(selectorList)).each((index, modal) => {
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
