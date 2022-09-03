// get category and show them
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}
// display categories on category section
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category_container')
    categories.map(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <button onclick="getCategoryName('${category.category_id}', '${category.category_name}')">${category.category_name}</button>
        `;
        categoryContainer.appendChild(li)
    })
}
// clicking on the category and get their name and id, send then to load news
const getCategoryName = (categoryId, categoryName) => {
    loader(true)
    loadNews(categoryId, categoryName)
}
// calling category to show category menu
loadCategory()

// load news by category id and send them to another function to show news
const loadNews = async (id, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayNews(data.data, categoryName);
    }
    catch (error) {
        console.log(error);
    }
}
// display news by category id and name/ load new counter/ send news id to another function to show single news details
const displayNews = (allNews, categoryName) => {
    // sorting news data by total view
    allNews.sort(function(a, b){
        return a.total_view - b.total_view;
    })
    const newsContainer = document.getElementById('news_container');
    newsContainer.innerHTML = ""
    const message = document.getElementById('message');
    if (allNews.length !== 0) {
        message.innerText = `${allNews.length} items found for category '${categoryName}'`;
    }
    else if (allNews.length === 0) {
        message.innerText = `nothing found on category '${categoryName}'`;
    }
    else {
        message.innerText = ''
    }
    allNews.map(news => {
        const cardBox = document.createElement('div');
        cardBox.innerHTML = `
        <div onclick="newsDetails('${news._id}')" class="card mb-3 p-3 border-0 shadow rounded-4" data-bs-toggle="modal" data-bs-target="#showNews">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${news.thumbnail_url}" class="img-fluid card-image rounded-start" alt="image">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text text-muted">${news.details.length < 500 ? news.details : `${news.details.slice(0, 500)}...`}</p>
                        <div class="user_container mt-4 d-flex justify-content-between align-items-center flex-wrap">
                            <div class="user_info d-flex align-items-center">
                                <div class="user_image">
                                    <img src="${news.author.img}.png" alt="image">
                                </div>  
                                <div class="user_data">
                                    <strong>${news.author.name ? news.author.name : 'no data found'}</strong>
                                    <small class="text-muted d-block">${news.author.published_date ? news.author.published_date.slice(0, 10) : 'no data found'}</small>
                                </div>                                      
                            </div>
                            <div class="view_count m-2">
                                <i class="fa-regular fa-eye"></i>
                                <strong>${news.total_view ? news.total_view : 'no data found'}</strong>
                            </div>
                            <div class="rating m-2">
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star text-warning"></i>
                                <i class="fa-solid fa-star-half-stroke text-warning"></i>
                            </div>
                            <div class="see_details">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        `
        newsContainer.appendChild(cardBox)
    });
    loader(false)
}
//loader spinner function 
const loader = isLoading => {
    const loadContainer = document.getElementById('loadContainer');
    if(isLoading){
        loadContainer.classList.remove('d-none')
    }
    else{
        loadContainer.classList.add('d-none')
    }
}


// single news details from single news ID
const newsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}
// show news details by a modal
const displayNewsDetails = (singleNewsDetails) => {
    const showNewsLabel = document.getElementById('showNewsLabel');
    showNewsLabel.textContent = singleNewsDetails?.title;
    const modalImage = document.getElementById('modal_image');
    modalImage.src = singleNewsDetails?.image_url;
    const modalDetailsText = document.getElementById('modal_details');
    modalDetailsText.innerText = singleNewsDetails?.details;
    const userImage = document.getElementById('userImage');
    userImage.src = singleNewsDetails?.author.img;
    const authorName = document.getElementById('authorName');
    authorName.innerText = singleNewsDetails?.author?.name ? singleNewsDetails.author.name : 'no data found';
    const viewCount = document.getElementById('viewCount');
    viewCount.innerText = singleNewsDetails?.total_view ? singleNewsDetails.total_view : 'no data found';
}
newsDetails()
loadNews('01', 'Breaking News')