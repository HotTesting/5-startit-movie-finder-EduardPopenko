import { browser, $, $$, element, by, By, ExpectedConditions as EC} from 'protractor';

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
        expect(await movieDetailsHeader.getText()).to.contain(movieName); 
    })

    it('should have raiting', async function () {
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
        let movieRaiting = $('app-movie h2 > small');  
        await movieCardTitle.click();
        await browser.wait(EC.visibilityOf(movieRaiting), 20000, 'movie raiting should appear in 20 seconds, but it doesnt');
        expect(await movieRaiting.getText()).not.to.be.NaN;
        console.log('the raiting is ', await movieRaiting.getText()); 
    })

    it('should have simular movies block with atleast one movie', async function () {
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
        let similarMovies = $$('app-movie > div.row.is-flex > div > movie-card');
        await movieCardTitle.click();
        await browser.wait(EC.visibilityOf(similarMovies.last()), 20000, 'similar movies should appear in 20 seconds, but it doesnt');
        expect(await similarMovies.count()).to.be.above(0, 'there is no movies in simular movies block');
        console.log('there is ', await similarMovies.count(),' simular movies');
    })

    describe('cast block', async function () {
        beforeEach(async function () {
            let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');  
            await movieCardTitle.click();  
        })
        it('should show atleast one actor', async function () {
            let actors = $$('app-movie > div > div.col-md-8 > div > div.col-md-3');
            await browser.wait(EC.visibilityOf(actors.last()), 20000, 'actors should appear in 20 seconds, but it doesnt');
            expect(await actors.count()).to.be.above(0, 'there is no actors in cast block');
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
            expect(await reviews.count()).to.be.above(0, 'there is no reviews in reviews block');
            console.log('there is ', await reviews.count(),' reviews');   
        })

        it('should have reviewer name as link to source', async function () {
            const THIS_SITE_LINK = 'https://movies-finder';
            let reviewSources = $$('app-movie > div > div.col-md-6 cite a');
            await browser.wait(EC.visibilityOf(reviewSources.last()), 20000, 'similar movies should appear in 20 seconds, but it doesnt');
            let reviewSourceLinks: any = await reviewSources.getAttribute('href')
            reviewSourceLinks.forEach(sourceLink => {
                expect(sourceLink).not.to.contain(THIS_SITE_LINK);
                console.log(sourceLink);
            })
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
        expect(await searchBar.isPresent()).to.be.false;
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
        let reliseDateLocator = $$('p strong ').first();
        expect(await reliseDateLocator.getText()).to.contain('Release Date:');
        await popularSeriesSectionNavigatonButton.click();
        await browser.wait(EC.visibilityOf(reliseDateLocator), 20000, 'First movie card should appear in 20 seconds, but it doesnt');
        expect(await reliseDateLocator.getText()).to.contain('First Air Date:');
    })
})