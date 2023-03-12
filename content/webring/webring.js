// const DATA_FOR_WEBRING = `https://raw.githubusercontent.com/palbee/art-swirl/main/sitelist.json`;
const DATA_FOR_WEBRING = `../sitelist.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
.webring {
  border: 15px groove #1c438f;border-right-color: #9dc214;border-bottom-color: #c5167b;border-left-color: #3b5b2a;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 1rem;

  text-align: center;

  font: 60% system-ui, sans-serif;
}
.icon {
  font-size: 64px;
}

@keyframes example {
  from  {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}

div.icon {
 animation-name: example;
 animation-duration: 360s;
 animation-iteration-count: infinite;
 animation-fill-mode: both;
 animation-timing-function: linear;
 display: flex;
  justify-content: center;
  align-items: center;
}

</style>


<div class="webring">
  <div class="icon">🍥</div>
  <div id="copy">
  </div>
  <div class="icon">🍥</div>
</div>`;

class Webring extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const thisSite = this.getAttribute("site");
        const siteList = this.getAttribute("ringlist");
        fetch(siteList)
            .then((response) => response.json())
            .then((site_data) => {
                const nSites = site_data.sitelist.length;

                // Find the current site in the data
                const matchedSiteIndex = site_data.sitelist.findIndex(
                    (site) => site.address === thisSite
                );
                let cp = `<p>${thisSite} can't be found.</p><p>Please check that the site
                          property is correct in the webring-swirl tag. If you are still
                          having problems please contact the <a href="${site_data.ringhome}"
                          target="_blank">${site_data.ringname}</a> ring keeper.</p>`;

                if (matchedSiteIndex !== -1) {
                    const matchedSite = site_data.sitelist[matchedSiteIndex];
                    const prevSiteIndex = (matchedSiteIndex - 1 + nSites) % nSites;
                    const nextSiteIndex = (matchedSiteIndex + 1) % nSites;
                    const randomSiteIndex = this.getRandomInt(0, nSites - 1);

                    cp = `<h1>${site_data.ringname} Webring</h1><p> <a href="${matchedSite.address}">
                            ${matchedSite.name}</a> site is by ${matchedSite.owner}</p>
                            <p><a href="${site_data.sitelist[prevSiteIndex].address}" title="${site_data.sitelist[prevSiteIndex].name}">[Prev]</a>
                            <a href="${site_data.sitelist[randomSiteIndex].address}" title="${site_data.sitelist[randomSiteIndex].name}">[Random]</a>
                            <a href="${site_data.sitelist[nextSiteIndex].address}" title="${site_data.sitelist[nextSiteIndex].name}">[Next]</a></p>
                             <p><a href="${site_data.ringhome}" target="_blank">[Ring Home]</a>
<!--                            <a href="${siteList}">[Member List]</a>-->
                            </p>`;
                }
                this.shadowRoot
                    .querySelector("#copy")
                    .insertAdjacentHTML("afterbegin", cp);
            });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

window.customElements.define("webring-swirl", Webring);