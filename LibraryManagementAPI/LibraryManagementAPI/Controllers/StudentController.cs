using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using LibraryDataAccess;
using LibraryManagementAPI.Models.viewModels;
using Newtonsoft.Json;

namespace LibraryManagementAPI.Controllers
{
    
    public class StudentController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/Student
        public HttpResponseMessage GetStudents()
        {
            var students = db.Students;
            List<viewStudent> viewStudents = new List<viewStudent>();
            foreach (Student student in students)
            {
                viewStudents.Add(new viewStudent
                {
                    Student_ID = student.Student_ID,
                    First_Name = student.First_Name,
                    Last_Name = student.Last_Name,
                    ContactPreference = student.ContactPreference,
                    Email = student.Email,
                    Phone = student.Phone,
                    Photo = student.Photo != null ? Convert.ToBase64String(student.Photo, 0, student.Photo.Length) : null,
                    Course_ID = student.Course_ID,
                    StudentCourse = student.StudentCourse
                });
            }
            //return viewStudents;


            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, viewStudents);
            return httpResponseMessage;
        }

        // GET: api/Student/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/Student/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.Student_ID)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Student
        
        public IHttpActionResult PostStudent()
        {
            var httpRequest = HttpContext.Current.Request;
            var file = httpRequest.Files["photo"];
            var firstName = httpRequest["firstName"];
            var lastName = httpRequest["lastName"];
            var contactPreference = httpRequest["contactPreference"];
            var email = httpRequest["email"];
            var phone = httpRequest["phone"];
            var courseID = httpRequest["courseID"];

            Student student = new Student();
            
            student.First_Name = firstName;
            student.Last_Name = lastName;
            student.ContactPreference = contactPreference;
            student.Email = email;
            student.Phone = phone;

            student.Photo = new byte[file.ContentLength];
            file.InputStream.Read(student.Photo, 0, file.ContentLength);

            student.Course_ID = Int32.Parse(courseID);

            db.Students.Add(student);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = student.Student_ID }, student);
        }

        // DELETE: api/Student/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);
            db.SaveChanges();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Students.Count(e => e.Student_ID == id) > 0;
        }
    }
}