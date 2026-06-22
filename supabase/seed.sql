-- Seed data for MGM Hospital Booking System
-- Run this after migrations to populate initial data

-- Departments
INSERT INTO departments (name, description, is_active) VALUES
  ('Cardiology', 'Heart and cardiovascular system care', true),
  ('Neurology', 'Brain, spine and nervous system disorders', true),
  ('Orthopedics', 'Bone, joint and muscle care', true),
  ('Pediatrics', 'Healthcare for infants, children and adolescents', true),
  ('Emergency Medicine', '24/7 emergency and trauma care', true),
  ('General Medicine', 'Primary healthcare and internal medicine', true),
  ('Gynecology', 'Women''s reproductive health', true),
  ('Dermatology', 'Skin, hair and nail disorders', true),
  ('Ophthalmology', 'Eye care and vision correction', true),
  ('ENT', 'Ear, nose and throat specialist care', true),
  ('Urology', 'Urinary tract and male reproductive system', true),
  ('Pulmonology', 'Lung and respiratory care', true),
  ('Gastroenterology', 'Digestive system disorders', true),
  ('Oncology', 'Cancer diagnosis and treatment', true),
  ('Nephrology', 'Kidney care and dialysis', true);

-- Sample doctors (consultation_fee in paise: 50000 = ₹500)
INSERT INTO doctors (name, phone, email, department_id, qualification, experience_years, consultation_fee, is_active)
SELECT 
  d.name, d.phone, d.email, dept.id, d.qualification, d.experience_years, d.consultation_fee, true
FROM (VALUES
  ('Dr. Rajesh Kumar', '+919876543001', 'rajesh.kumar@mgm.com', 'Cardiology', 'MD, DM Cardiology', 15, 80000),
  ('Dr. Priya Sharma', '+919876543002', 'priya.sharma@mgm.com', 'Neurology', 'MD, DM Neurology', 12, 75000),
  ('Dr. Suresh Patel', '+919876543003', 'suresh.patel@mgm.com', 'Orthopedics', 'MS Orthopedics', 18, 70000),
  ('Dr. Anita Reddy', '+919876543004', 'anita.reddy@mgm.com', 'Pediatrics', 'MD Pediatrics', 10, 60000),
  ('Dr. Mohammed Ali', '+919876543005', 'mohammed.ali@mgm.com', 'General Medicine', 'MD Internal Medicine', 20, 50000),
  ('Dr. Lakshmi Nair', '+919876543006', 'lakshmi.nair@mgm.com', 'Gynecology', 'MS OBG', 14, 70000),
  ('Dr. Vikram Singh', '+919876543007', 'vikram.singh@mgm.com', 'Emergency Medicine', 'MD Emergency Medicine', 8, 60000),
  ('Dr. Deepa Menon', '+919876543008', 'deepa.menon@mgm.com', 'Dermatology', 'MD Dermatology', 11, 65000),
  ('Dr. Arjun Rao', '+919876543009', 'arjun.rao@mgm.com', 'Cardiology', 'MD, DM Cardiology, FACC', 22, 100000),
  ('Dr. Kavitha Iyer', '+919876543010', 'kavitha.iyer@mgm.com', 'Ophthalmology', 'MS Ophthalmology', 13, 60000)
) AS d(name, phone, email, dept_name, qualification, experience_years, consultation_fee)
JOIN departments dept ON dept.name = d.dept_name;

-- Sample schedules for doctors (Monday to Saturday, 9 AM - 5 PM, 30-min slots)
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration, is_available)
SELECT d.id, dow.day, '09:00'::TIME, '17:00'::TIME, 30, true
FROM doctors d
CROSS JOIN (VALUES (1), (2), (3), (4), (5), (6)) AS dow(day) -- Mon-Sat
WHERE d.is_active = true;
