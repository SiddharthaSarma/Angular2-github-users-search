import { GithubLocationSearchPage } from './app.po';

describe('github-location-search App', () => {
  let page: GithubLocationSearchPage;

  beforeEach(() => {
    page = new GithubLocationSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
