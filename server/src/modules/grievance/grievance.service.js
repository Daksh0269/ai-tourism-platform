const grievancePayload = {
  userId,
  text,
  location,
  status: 'submitted',
};

const saved = await grievanceRepository.create(grievancePayload);
return saved;