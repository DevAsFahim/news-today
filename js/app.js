// get category and show them
const loadCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.data.news_category);
}
//category.category_name
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category_container')
    categories.map(category => {
        
    })
}

loadCategory()