// get category and show them
const loadCategory = async() => {
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
        <a href="">${category.category_name}</a>
        `;
        categoryContainer.appendChild(li)
    })
}
loadCategory()

// const loadNews = async() => {
//     const url = `https://openapi.programming-hero.com/api/news/category/01`
//     const res = await fetch(url)
//     const data = await res.json()
//     displayNews(data.data);
// }
// const displayNews = (allNews) => {
//     const 
//     allNews.map(news => {
//         console.log(news);

//     })
// }
loadNews()