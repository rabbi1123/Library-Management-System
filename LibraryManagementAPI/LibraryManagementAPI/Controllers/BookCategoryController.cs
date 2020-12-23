using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LibraryDataAccess;

namespace LibraryManagementAPI.Controllers
{
    public class BookCategoryController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/BookCategory
        public HttpResponseMessage GetBookCategories()
        {
            var returnObject = db.BookCategories.Select(x => new { x.BookCategory_ID, x.Category_Name });
            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, returnObject);
            return httpResponseMessage;
        }

        // GET: api/BookCategory/5
        [ResponseType(typeof(BookCategory))]
        public IHttpActionResult GetBookCategory(int id)
        {
            BookCategory bookCategory = db.BookCategories.Find(id);
            if (bookCategory == null)
            {
                return NotFound();
            }

            return Ok(bookCategory);
        }

        // PUT: api/BookCategory/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookCategory(int id, BookCategory bookCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookCategory.BookCategory_ID)
            {
                return BadRequest();
            }

            db.Entry(bookCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BookCategory
        [ResponseType(typeof(BookCategory))]
        public IHttpActionResult PostBookCategory(BookCategory bookCategory)
        {

            db.BookCategories.Add(bookCategory);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookCategory.BookCategory_ID }, bookCategory);
        }

        // DELETE: api/BookCategory/5
        [ResponseType(typeof(BookCategory))]
        public IHttpActionResult DeleteBookCategory(int id)
        {
            BookCategory bookCategory = db.BookCategories.Find(id);
            if (bookCategory == null)
            {
                return NotFound();
            }

            db.BookCategories.Remove(bookCategory);
            db.SaveChanges();

            return Ok(bookCategory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookCategoryExists(int id)
        {
            return db.BookCategories.Count(e => e.BookCategory_ID == id) > 0;
        }
    }
}