'use client';

import { useEffect, useState } from 'react';

interface Interview {
  id?: number;
  companyName: string;
  interviewDateTime: string; // matches backend DTO
  round: string;
  status: string;
  hrContact: string;
  userName?: string;
  userEmail?: string;
}

export default function InterviewTimeTable() {
  const [form, setForm] = useState({
    companyName: '',
    date: '',
    time: '',
    round: '',
    status: '',
    hrContact: ''
  });

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = Number(localStorage.getItem('userId')); // stored during login

  // Load schedules for this user
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/api/interviews/user/${userId}`)
      .then(res => res.json())
      .then(data => setInterviews(data))
      .catch(err => console.error('Error loading schedules:', err));
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddInterview = async () => {
    if (!form.companyName || !form.date || !form.time) {
      alert('Please fill at least Company Name, Date, and Time.');
      return;
    }

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Combine date & time into backend format (ISO 8601)
    const interviewDateTime = `${form.date}T${form.time}:00`;

    const payload: Interview = {
      companyName: form.companyName,
      interviewDateTime,
      round: form.round,
      status: form.status,
      hrContact: form.hrContact
    };

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/interviews/${userId}`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      const savedInterview: Interview = await res.json();
      setInterviews((prev) => Array.isArray(prev) ? [...prev, savedInterview] : [savedInterview]);


      // Reset form
      setForm({
        companyName: '',
        date: '',
        time: '',
        round: '',
        status: '',
        hrContact: ''
      });

      alert('Interview saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving interview.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">Add Upcoming Interview</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="p-2 rounded bg-gray-700 border border-gray-600" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600" />
        <input type="time" name="time" value={form.time} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600" />
        <input type="text" name="round" value={form.round} onChange={handleChange} placeholder="Round (e.g. Technical, HR)" className="p-2 rounded bg-gray-700 border border-gray-600" />
        <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded bg-gray-700 border border-gray-600">
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Cleared">Cleared</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input type="text" name="hrContact" value={form.hrContact} onChange={handleChange} placeholder="HR Contact" className="p-2 rounded bg-gray-700 border border-gray-600" />
      </div>

      <button onClick={handleAddInterview} disabled={loading} className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg disabled:opacity-50">
        {loading ? 'Saving...' : 'Add Interview'}
      </button>

      {/* Table */}
      {interviews.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border border-gray-600">Company</th>
                <th className="px-4 py-2 border border-gray-600">Interview Date/Time</th>
                <th className="px-4 py-2 border border-gray-600">Round</th>
                <th className="px-4 py-2 border border-gray-600">Status</th>
                <th className="px-4 py-2 border border-gray-600">HR Contact</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border border-gray-600">{interview.companyName}</td>
                  <td className="px-4 py-2 border border-gray-600">
                    {new Date(interview.interviewDateTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-600">{interview.round}</td>
                  <td className="px-4 py-2 border border-gray-600">{interview.status}</td>
                  <td className="px-4 py-2 border border-gray-600">{interview.hrContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
