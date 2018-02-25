import {AppPage} from './app.po';



describe('RSS-Reader App', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to RSS-Reader!');
  });

});
