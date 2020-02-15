import { LitElement, css, html } from 'lit-element';

import { Octokit } from '@octokit/rest';

const octokit = Octokit();

const links = [
  {
    name: "Github",
    url: "https://github.com/mengelbart",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/MathisEngelbart"

  },
  {
    name: "Blog",
    url: "https://blog.mathis.dev",
  }
];

class ResultList extends LitElement {

  constructor() {
    super();
    this.search = '';
    this.links = links;
    octokit.repos.listForUser({
	username: 'mengelbart',
    }).then(({ data }) => {
	links.push(...data.map(r => ({
	    name: r.name,
	    url: r.html_url,
	})));
	this.requestUpdate();
    });
  }

  static get properties() {
    return {
      search: { type: String },
      links: { type: Array },
    };
  }

  handleInput(e) {
    this.search = e.target.value;
    this.links = this.filter(links, this.search);
  }

  filter(links, search) {
    return links.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0))
  }

  render() {
    return html`<div id="wrapper">
  <label for="filter" class="visuallyhidden">Filter</label>
  <input id="filter" name="filter" type="text" placeholder="Filter" @input="${this.handleInput}" .value="${this.search}">
  <div>
    <p>
      Not much to filter here, just a small example of using <a href="https://github.com/Polymer/lit-element" target="_blank" rel="noreferrer">lit-element</a> to create a filter-webcomponent. Find the source on <a href="https://github.com/mengelbart/landingpage/">github</a>
    </p>
  </div>
</div>
<div class="results">
  ${this.links.map((link) => html`<div class="link">
    <a href="${link.url}" target="_blank" rel="noreferrer">${link.name}</a>
  </div>`)}
<div class="results">
`;
  }

  static get styles() {
    return css`
.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.results {
  margin: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#filter {
  width: 100%;
  height: 46px;
  padding: 6px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid darkgray;
}

.link {
  margin: 10px;
}
    `;
  }
}

customElements.define('result-list', ResultList);
