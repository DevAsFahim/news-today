// get category and show them
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.data.news_category);
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
const getCategoryName = (categoryId, categoryName) => {
    loadNews(categoryId, categoryName)
}
loadCategory()

const loadNews = async (id, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data, categoryName);
}
const displayNews = (allNews, categoryName) => {
    const newsContainer = document.getElementById('news_container');
    newsContainer.innerHTML = ""
    const message = document.getElementById('message');
    if(allNews.length !== 0){
        message.innerText = `${allNews.length} items found for category '${categoryName}'`;
    }
    else if(allNews.length === 0){
        message.innerText = `nothing found on category '${categoryName}'`;
    }
    else{
        message.innerText = ''
    }
    // onclick="newsDetails('${news._id}')"
    allNews.map(news => {
        const cardBox = document.createElement('div');
        cardBox.innerHTML = `
        <div      class="card mb-3 p-3 border-0 shadow rounded-4" data-bs-toggle="modal" data-bs-target="#showNews">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="image">
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
                                    <strong>${news.author.name}</strong>
                                    <small class="text-muted d-block">${news.author.published_date ? news.author.published_date.slice(0, 10) : ''}</small>
                                </div>                                      
                            </div>
                            <div class="view_count m-2">
                                <i class="fa-regular fa-eye"></i>
                                <strong>${news.total_view}</strong>
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

    })
}
const newsDetails = async() => {
    // const url = `https://openapi.programming-hero.com/api/news/{news_id}`
    const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsDetails(data.data[0]);
}
const displayNewsDetails = (singleNewsDetails) => {
    console.log(singleNewsDetails);
    const showNewsLabel = document.getElementById('showNewsLabel');
    showNewsLabel.innerText = singleNewsDetails.title;
}
newsDetails()
loadNews('01', 'Breaking News')