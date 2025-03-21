import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // This is a placeholder for actual authentication logic
    // In a real application, you would verify credentials against a database
    
    if (email === 'admin@example.com' && password === 'password') {
      // Successful login
      return NextResponse.json({ 
        success: true, 
        user: { 
          id: '1', 
          name: 'Admin User', 
          email: 'admin@example.com',
          role: 'admin' 
        } 
      });
    } else {
      // Failed login
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 