import { browser, element, By, $$, $, by, Key} from 'protractor'

describe('Protractor', function () {
  it('should have name', async function (){
    await browser.get('/')
    let a = $$('movie-card').$$('a')
    console.log(await a.getAttribute('title'))
    })
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

  //Navigation
  describe('Navigation', async function() {
    it('should open "Upcoming movies" section', async function(){
    await browser.get('/')
    let upcomingMoviesButton = await $$('.navbar-nav > li > a').first().click()
    expect(browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/upcoming")
    })

    it('should open "Popular Series" section', async function(){
    await browser.get('/')
    let popularSeriesButton = await $$('.navbar-nav > li > a').first().click()
    expect(browser.getCurrentUrl()).toBe("https://movies-finder.firebaseapp.com/popular/series")
    })

    it('should open "Action" section', async function(){
    await browser.get('/')
    let actionButton = await $$('.nav-stacked > a').first().click()
    expect(browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/genres/28/Action')
    })
  
  //Search
  fdescribe('Search', async function() {
    fit('by exisiting name, should show first movie with complete name match', async function(){
      await browser.get('/')
      
    })
  })
