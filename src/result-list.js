import { LitElement, css, html } from 'lit-element';

import { Octokit } from '@octokit/rest';

const octokit = Octokit();

const constantLinks = [
  {
    name: "Github",
    url: "https://github.com/mengelbart",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/MathisEngelbart",
  }
];

const staticLinks = [];

class ResultList extends LitElement {

  constructor() {
    super();
    this.search = '';
    this.links = [];
    octokit.repos.listForUser({
	    username: 'mengelbart',
    }).then(({ data }) => {
  // const data = [
  //   {
  //     name: 'test',
  //     url: 'testurl',
  //     description: 'description',
  //     fork: false,
  //   },
  //   {
  //     name: 'test1',
  //     url: 'testurl1',
  //     description: 'description1',
  //     fork: true,
  //   }
  // ];
      staticLinks.push(...data.map(r => ({
          name: r.name,
          url: r.html_url,
          description: r.description,
          fork: r.fork,
        })
      ));
      this.links = constantLinks.concat(this.splitForks(staticLinks));
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
    this.links = this.filter(constantLinks, this.search).concat(this.splitForks(this.filter(staticLinks, this.search)));
  }

  splitForks(rs) {
    const a = rs.filter((r) => !r.fork);
    const b = rs.filter((r) => r.fork);
    return a.concat(b);
  }

  filter(links, search) {
    return links.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  render() {
    return html`<header>
    <h1>Mathis Engelbart</h1>
  </header>
  <div id="wrapper">
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
    <a href="${link.url}" target="_blank" rel="noreferrer">${link.name} ${link.fork ? html`(fork)` : ``}</a>
    <p>${link.description}</p>
  </div>
  <div>
    
  </div>`)}
<div class="results">
`;
  }

  static get styles() {
    return css`

header {
  text-align: center;
}

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
  align-items: left;
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
