import { browser, element, By, $$, $, by, Key, ExpectedConditions as EC} from 'protractor';
describe('Movie details', async function () {
  beforeEach(async function () {
      await browser.get('/');    
  })

  it('should have movie name as header', async function () {
      let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
      let movieName = await $$('movie-card').first().$('.text-ellipsis a').getText();
      let movieDetailsHeader = $('app-movie > div:nth-child(1) > div.col-md-8 > h2');
      await movieCardTitle.click();
      await browser.wait(EC.visibilityOf(movieDetailsHeader), 20000, 'movie details header should appear in 20 seconds, but it doesnt');
      expect(await movieDetailsHeader.getText()).toContain(movieName); 
  })

  it('should have raiting', async function () {
    let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
    let movieRaiting = $('app-movie h2 > small');  
    await movieCardTitle.click();
    await browser.wait(EC.visibilityOf(movieRaiting), 20000, 'movie raiting should appear in 20 seconds, but it doesnt');
    expect(await movieRaiting.getText()).not.toBe("NaN");
    console.log('the raiting is ', await movieRaiting.getText()); 
  })

  it('should have simular movies block with atleast one movie', async function () {
    let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
    let similarMovies = $$('app-movie > div.row.is-flex > div > movie-card');
    await movieCardTitle.click();
    await browser.wait(EC.visibilityOf(similarMovies.last()), 20000, 'similar movies should appear in 20 seconds, but it doesnt');
    expect(await similarMovies.count()).toBe,("there is no movies in simular movies block");
    console.log('there is ', await similarMovies.count(),' simular movies');
  })
})
  describe('cast block', async function () {
    beforeEach(async function () {
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');  
        await movieCardTitle.click();  
    })
    it('should show atleast one actor', async function () {
        let actors = $$('app-movie > div > div.col-md-8 > div > div.col-md-3');
        await browser.wait(EC.visibilityOf(actors.last()), 20000, 'actors should appear in 20 seconds, but it doesnt');
        expect(await actors.count()).toBe,('there is no actors in cast block');
        console.log(await actors.count() + ' actors shows');     
    })
  })

  describe('reviews block', function () {
  beforeEach(async function () {
      let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');  
      await movieCardTitle.click();  
  })
  it('should be atleast one review', async function () {
      let reviews = $$('app-movie > div > div.col-md-6');
      await browser.wait(EC.visibilityOf(reviews.last()), 20000, 'reviews should appear in 20 seconds, but it doesnt');
      expect(await reviews.count()).toBe,('there is no reviews in reviews block');
      console.log('there is ', await reviews.count(),'reviews');   
  })
  it('should have reviewer name as link to source', async function () {
    const THIS_SITE_LINK = 'https://movies-finder';
    let reviewSources = $$('app-movie > div > div.col-md-6 cite a');
    await browser.wait(EC.visibilityOf(reviewSources.last()), 20000, 'similar movies should appear in 20 seconds, but it doesnt');
    let reviewSourceLinks: any = await reviewSources.getAttribute('href')
    reviewSourceLinks.forEach(sourceLink => {
        expect(sourceLink).not.toBe(THIS_SITE_LINK);
        console.log(sourceLink);
    })
  })
})

describe('Popular series', async function () {
  beforeEach(async function () {
      await browser.manage().timeouts().implicitlyWait(1000);
      await browser.get('/');
  })
  it('shouldnt have search bar', async function () {
      let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
      let popularSeriesList = $('app-popular-series > div > div > div.col-sm-6.col-md-4.col-lg-3.col-xs-6');
      let searchBar = $('div.jumbotron');
      await searchBar.isDisplayed;
      await popularSeriesSectionNavigatonButton.click();
      await browser.wait(EC.visibilityOf(popularSeriesList), 20000, 'Popular series list should appear in 20 seconds, but it doesnt');
      expect(await searchBar.isPresent()).toBe(false);
  })

  it('should have "First Air Date" instead "Release Date"', async function () {
      let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
      let reliseDateLocator = $$('p strong ').first();
      expect(await reliseDateLocator.getText()).toBe('Release Date:');
      await popularSeriesSectionNavigatonButton.click();
      await browser.wait(EC.visibilityOf(reliseDateLocator), 20000, 'First movie card should appear in 20 seconds, but it doesnt');
      expect(await reliseDateLocator.getText()).toBe('First Air Date:');
  })
})


//Home work #3
describe('Protractor', function () {
  it('should have name', async function (){
    await browser.get('/');
    let a = $$('movie-card').$$('a');
    console.log(await a.getAttribute('title'));
    })  
  
  it('should have "raiting" pointer', async function (){
    await browser.get('/')
    let movieCardRitingPointer = $$('movie-card').first().$('.text-ellipsis [title]');
    expect(await movieCardRitingPointer.isDisplayed()).toBe(true);
  })
  
  it('should open appropriate "movie details" page, after click on "name" field', async function(){
    await browser.get('/');
    let movieCardTitle = $$('movie-card').get(0).$('.text-ellipsis a');
    let movieCardHref = await movieCardTitle.getAttribute('href');        
    await movieCardTitle.click(); 
    expect(await browser.getCurrentUrl()).toEqual(movieCardHref);
  })
})
  //Navigation
  describe('Navigation', async function() {
    it('should open "Upcoming movies" section', async function(){
    await browser.get('/')
    let upcomingMoviesButton = await $$('.navbar-nav > li > a').first().click()
    expect(await browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/upcoming")
    })

    it('should open "Popular Series" section', async function(){
    await browser.get('/')
    let popularSeriesButton = await $$('.navbar-nav > li > a').first().click()
    expect(await browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/popular/series")
    })

    it('should open "Action" section', async function(){
    await browser.get('/')
    let actionButton = await $$('.nav-stacked > a').first().click()
    expect(await browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/genres/28/Action')
  })
})
  
  // Search
describe('Search ', async function(){

  it('by exisiting name, should show first movie with complete name match', async function(){
    await browser.get('/')
    let searchFilmName = 'Twin Peaks'
    let searchField = $$('[name="searchStr"]')
    let searchButton = $('.input-group-btn')
    let firstMovieName = $$('movie-card').get(0).$('[title]')
    await browser.get('/')
    await searchField.sendKeys(searchFilmName)
    await searchButton.click()
    await browser.sleep(3000)
    expect(await firstMovieName.getText()).toBe(searchFilmName)
    })

    it('result should be empty, after request for nonexistent movie', async function(){
    let searchUnexistingFilm = '43fer4'
    let searchField = $$('[name="searchStr"]')
    let searchButton = $('.input-group-btn')
    let MoviesName = $$('movies > div:nth-child(3) .text-ellipsis > a[title]')
    await browser.get('/')
    await searchField.sendKeys(searchUnexistingFilm)
    await searchButton.click()
    await browser.sleep(3000)
    expect(await MoviesName.count()).toEqual(0)
    console.log(await MoviesName.count())
    })
  })


describe('Protractor', function () {
  it('should have name', async function (){
    await browser.get('/')
    let a = $$('movie-card').$$('a')
    console.log(await a.getAttribute('title'))
    })

  it('should have "raiting" pointer', async function (){
    await browser.get('/')
    let movieCardRitingPointer = $$('movie-card').first().$('.text-ellipsis [title]');
    expect(await movieCardRitingPointer.isDisplayed()).toBe(true);
  })
  
  it('should open appropriate "movie details" page, after click on "name" field', async function(){
    await browser.get('/');
    let movieCardTitle = $$('movie-card').get(0).$('.text-ellipsis a');
    let movieCardHref = await movieCardTitle.getAttribute('href');        
    await movieCardTitle.click(); 

    expect(await browser.getCurrentUrl()).toEqual(movieCardHref); 
  })
  })

  //Navigation
  describe('Navigation', async function() {
    it('should open "Upcoming movies" section', async function(){
    await browser.get('/')
    let upcomingMoviesButton = await $$('.navbar-nav > li > a').first().click()
    expect(await browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/upcoming")
    })

    it('should open "Popular Series" section', async function(){
    await browser.get('/')
    let popularSeriesButton = await $$('.navbar-nav > li > a').first().click()
    expect(await browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/popular/series")
    })

    it('should open "Action" section', async function(){
    await browser.get('/')
    let actionButton = await $$('.nav-stacked > a').first().click()
    expect(await browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/genres/28/Action')
    })
  })