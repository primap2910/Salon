import React from 'react'
import { useState, useEffect } from 'react'
import Heder from '../common/Heder'
import Footer from '../common/Footer'
import Banner from '../common/Banner'
import Makeappointment from '../common/Makeappointment'
import axios from 'axios'
import api from '../utility/Apitoken'
import { Link } from 'react-router-dom'

function Category() {
  return (
    <>
      <Heder />
      <CategoryContext />
      <Footer />

    </>
  )
}
function CategoryContext() {
  return (
    <>
      <Banner title="our gallry" />
      <CategoryList />
      <Makeappointment />

    </>)
}

function CategoryList() {
  let [categories, setCategory] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(false)

  let getCategory = async () => {
    try {
      setLoading(true)

      let res = await api.get("/api/categories")

      setCategory(res.data?.categories || [])

    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  if (error) return <h1>Something went wrong 🚨</h1>
  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2><span>Our gallery</span></h2>
                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <h1>Loading...</h1>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <div className="col-sm-6 col-md-4">
                  <div className="gallery-item wow fadeIn">
                    <Link to={`/category/${category._id}`} className="venobox" data-gall="gallery">
                      
                      <img  referrerPolicy="no-referrer" style={{width: "100%", height: "250px", objectFit: "cover"}} src={category.category_image
                        ? category.category_image.startsWith("http")
                          ? category.category_image
                          : `http://localhost:8000${category.category_image}`
                        : "https://placehold.co/300"} alt={category.category_name} />


                      <div className="gallery-caption text-center">
                        <i className="fa fa-heart-o" />
                        <p>{category.category_description}</p>
                        <h3>{category.category_name}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h1>No categories found</h1>
            )}
          </div>
        </div>
      </section>

    </>
  )
}

export default Category