"use strict";
(function () {
    const oldSkoolTemplate = (`<style>
    .webring {
        border: 15px groove #1c438f;
        border-right-color: #9dc214;
        border-bottom-color: #c5167b;
        border-left-color: #3b5b2a;
        padding: 1rem;

        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-gap: 1rem;

        text-align: center;

        font: 100% system-ui, sans-serif;
    }

    .icon {
        font-size: 64px;
        animation-duration: 360s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-timing-function: linear;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    @keyframes left {
        from {
            transform: rotate(0deg) scale(-1, 1);
        }
        to {
            transform: rotate(360deg) scale(-1, 1);
        }
    }

    @keyframes right {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }


    div.iconleft {
        animation-name: left;
    }

    div.iconright {
        animation-name: right;
    }

</style>
<div class="webring">
    <div class="icon iconleft">🍥</div>
    <div id="copy">
    </div>
    <div class="icon iconright">🍥</div>
</div>`);

    const lowProfileTemplate = `<style>
    .webring {
        border: 1px groove black;
        text-align: center;
        font: 100% system-ui, sans-serif;
    }

</style>

<div class="webring">
    <div id="copy"></div>
</div>`;

    function buildTemplate(theme) {
        const template = document.createElement("template");
        switch (theme) {
            case "low-profile":
                template.innerHTML = lowProfileTemplate;
                break;
            default:
                template.innerHTML = oldSkoolTemplate;
        }
        return template;
    }

    class Webring extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"});

            const memberSite = this.getAttribute("site");
            const ringSpecification = this.getAttribute("ringlist");
            const theme = this.getTheme();
            const template = buildTemplate(theme);
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            fetch(ringSpecification).then(this.handleErrors)
                .then((response) => response.json())
                .then((site_data) => {
                    console.info(site_data);
                    const site_list = site_data['sitelist'];
                    const nSites = site_list.length;

                    // Find the current site in the data
                    const matchedSiteIndex = site_list.findIndex((site) => site.address === memberSite);
                    let cp;

                    if (matchedSiteIndex !== -1) {
                        const matched_site = site_list[matchedSiteIndex];
                        const previous_site = site_list[(matchedSiteIndex - 1 + nSites) % nSites];
                        const next_site = site_list[(matchedSiteIndex + 1) % nSites];
                        const random_site = site_list[this.getRandomInt(0, nSites - 1)];

                        cp = this.get_tile_content(theme, site_data, matched_site, previous_site, next_site, random_site);
                    } else {
                        cp = `<h1>${memberSite} can't be found.</h1><p>Please check that the site
                          property is correct in the webring-swirl tag. If you are still
                          having problems please contact the <a href="${site_data["ringhome"]}"
                          target="_blank">${site_data["ringname"]}</a> ring keeper.</p>`;
                    }
                    this.shadowRoot
                        .querySelector("#copy")
                        .insertAdjacentHTML("afterbegin", cp);
                })
                .catch(error => {
                    console.log(error);
                    this.shadowRoot
                        .querySelector("#copy")
                        .insertAdjacentHTML("afterbegin",
                            `<h1>Could not load ${ringSpecification}</h1>
                            <p>Please check that the ringlist property is correct in the webring-swirl tag.</p>`);
                });
        }

        get_tile_content(theme, site_data, matched_site, previous_site, next_site, random_site) {
            switch (theme) {
                case 'low-profile':
                    return `<p>${site_data["ringname"]} Webring</p>
                        <p><a href="${previous_site.address}" title="${previous_site.name}">[Prev]</a>
                            <a href="${random_site.address}" title="${random_site.name}">[Random]</a>
                            <a href="${site_data["ringhome"]}" target="_blank">[Ring Home]</a>
                            <a href="${next_site.address}" title="${next_site.name}">[Next]</a></p>`;
                default:
                    return `<h1>${site_data["ringname"]} Webring</h1><p> <a href="${matched_site.address}">
                            ${matched_site.name}</a> site is by ${matched_site["owner"]}</p>
                            <p><a href="${previous_site.address}" title="${previous_site.name}">[Prev]</a>
                            <a href="${random_site.address}" title="${random_site.name}">[Random]</a>
                            <a href="${next_site.address}" title="${next_site.name}">[Next]</a></p>
                             <p><a href="${site_data["ringhome"]}" target="_blank">[Ring Home]</a>
                            </p>`;

            }
        }

        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        getTheme() {
            if (this.hasAttribute("theme")) {
                return this.getAttribute("theme");
            }
            return "old-skool";
        }
    }

    window.customElements.define("webring-swirl", Webring);
})();
