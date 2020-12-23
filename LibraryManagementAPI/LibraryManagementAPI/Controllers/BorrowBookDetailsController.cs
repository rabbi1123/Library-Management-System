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
    public class BorrowBookDetailsController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/BorrowBookDetails
        public IQueryable<BorrowBookDetail> GetBorrowBookDetails()
        {
            return db.BorrowBookDetails;
        }

        // GET: api/BorrowBookDetails/5
        [ResponseType(typeof(BorrowBookDetail))]
        public IHttpActionResult GetBorrowBookDetail(int id)
        {
            BorrowBookDetail borrowBookDetail = db.BorrowBookDetails.Find(id);
            if (borrowBookDetail == null)
            {
                return NotFound();
            }

            return Ok(borrowBookDetail);
        }

        // PUT: api/BorrowBookDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBorrowBookDetail(int id, BorrowBookDetail borrowBookDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != borrowBookDetail.BorrowBookDetails_ID)
            {
                return BadRequest();
            }

            db.Entry(borrowBookDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowBookDetailExists(id))
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

        // POST: api/BorrowBookDetails
        [ResponseType(typeof(BorrowBookDetail))]
        public IHttpActionResult PostBorrowBookDetail(BorrowBookDetail borrowBookDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BorrowBookDetails.Add(borrowBookDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = borrowBookDetail.BorrowBookDetails_ID }, borrowBookDetail);
        }

        // DELETE: api/BorrowBookDetails/5
        [ResponseType(typeof(BorrowBookDetail))]
        public IHttpActionResult DeleteBorrowBookDetail(int id)
        {
            BorrowBookDetail borrowBookDetail = db.BorrowBookDetails.Find(id);
            if (borrowBookDetail == null)
            {
                return NotFound();
            }

            db.BorrowBookDetails.Remove(borrowBookDetail);
            db.SaveChanges();

            return Ok(borrowBookDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BorrowBookDetailExists(int id)
        {
            return db.BorrowBookDetails.Count(e => e.BorrowBookDetails_ID == id) > 0;
        }
    }
}