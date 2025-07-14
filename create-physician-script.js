// Temporary script to create physician
// Run this in browser console on the app

const createPhysician = async () => {
  const { supabase } = window;
  
  // Create physician account
  const { data: createResult, error: createError } = await supabase.functions.invoke('physician-management', {
    body: {
      action: 'create_physician',
      email: 'nadia@greendothealth.com',
      fullName: 'Sepedeh Nabavi, MD',
      medicalLicense: '77087',
      specialty: 'emergency medicine',
      phoneNumber: '(770) 597-3081',
      emergencyContactName: 'David Gutt',
      emergencyContactRelationship: 'spouse',
      emergencyContactPhone: '(404) 290-4220'
    }
  });

  if (createError) {
    console.error('Error creating physician:', createError);
    return;
  }

  console.log('Physician created:', createResult);
  
  const physicianId = createResult.user_id;
  
  // Add GA state license
  const { data: gaResult, error: gaError } = await supabase.functions.invoke('physician-management', {
    body: {
      action: 'add_state_license',
      physicianId: physicianId,
      stateCode: 'GA',
      stateName: 'Georgia',
      licenseNumber: '77087',
      expirationDate: '2026-05-31'
    }
  });

  if (gaError) {
    console.error('Error adding GA license:', gaError);
  } else {
    console.log('GA license added:', gaResult);
  }

  // Add TX state license
  const { data: txResult, error: txError } = await supabase.functions.invoke('physician-management', {
    body: {
      action: 'add_state_license',
      physicianId: physicianId,
      stateCode: 'TX',
      stateName: 'Texas',
      licenseNumber: 'TX55025',
      expirationDate: '2028-05-31'
    }
  });

  if (txError) {
    console.error('Error adding TX license:', txError);
  } else {
    console.log('TX license added:', txResult);
  }
};

// Run the function
createPhysician();