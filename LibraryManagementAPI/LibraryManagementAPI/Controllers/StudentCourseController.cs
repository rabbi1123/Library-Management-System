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
    public class StudentCourseController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/StudentCourse
        public HttpResponseMessage GetStudentCourses()
        {
            HttpResponseMessage httpResponseMessage;
            var returnObject = db.StudentCourses;
            httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, returnObject);
            return httpResponseMessage;
        }

        // GET: api/StudentCourse/5
        [ResponseType(typeof(StudentCourse))]
        public IHttpActionResult GetStudentCourse(int id)
        {
            StudentCourse studentCourse = db.StudentCourses.Find(id);
            if (studentCourse == null)
            {
                return NotFound();
            }

            return Ok(studentCourse);
        }

        // PUT: api/StudentCourse/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudentCourse(int id, StudentCourse studentCourse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != studentCourse.StudentCourse_ID)
            {
                return BadRequest();
            }

            db.Entry(studentCourse).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentCourseExists(id))
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

        // POST: api/StudentCourse
        [ResponseType(typeof(StudentCourse))]
        public IHttpActionResult PostStudentCourse(StudentCourse studentCourse)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.StudentCourses.Add(studentCourse);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = studentCourse.StudentCourse_ID }, studentCourse);
        }

        // DELETE: api/StudentCourse/5
        [ResponseType(typeof(StudentCourse))]
        public IHttpActionResult DeleteStudentCourse(int id)
        {
            StudentCourse studentCourse = db.StudentCourses.Find(id);
            if (studentCourse == null)
            {
                return NotFound();
            }

            db.StudentCourses.Remove(studentCourse);
            db.SaveChanges();

            return Ok(studentCourse);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentCourseExists(int id)
        {
            return db.StudentCourses.Count(e => e.StudentCourse_ID == id) > 0;
        }
    }
}