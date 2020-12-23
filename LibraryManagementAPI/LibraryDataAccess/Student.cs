//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LibraryDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class Student
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Student()
        {
            this.BorrowBooks = new HashSet<BorrowBook>();
        }
    
        public int Student_ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string ContactPreference { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public byte[] Photo { get; set; }
        public Nullable<int> Course_ID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BorrowBook> BorrowBooks { get; set; }
        public virtual StudentCourse StudentCourse { get; set; }
    }
}
