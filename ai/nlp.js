const simpleResponses = {
  en: {
    'how to apply': 'To apply for an internship, go to the Search Internships page, select your preferences, and click "Apply Now" on the desired internship.',
    'what is pm internship': 'The PM Internship Scheme is a government initiative to provide internship opportunities in India’s top 500 companies.',
    'default': 'I’m not sure how to help with that. Could you provide more details or visit our FAQ page?',
  },
  hi: {
    'आवेदन कैसे करें': 'इंटर्नशिप के लिए आवेदन करने के लिए, इंटर्नशिप खोजें पेज पर जाएं, अपनी प्राथमिकताएं चुनें, और इच्छित इंटर्नशिप पर "अभी आवेदन करें" क्लिक करें।',
    'पीएम इंटर्नशिप क्या है': 'पीएम इंटर्नशिप योजना भारत की शीर्ष 500 कंपनियों में इंटर्नशिप अवसर प्रदान करने वाली एक सरकारी पहल है।',
    'default': 'मुझे यकीन नहीं है कि उसमें कैसे मदद करनी है। कृपया अधिक विवरण प्रदान करें या हमारे FAQ पेज पर जाएं।',
  },
};

function processQuery(query, language = 'en') {
  const normalizedQuery = query.toLowerCase().trim();
  return simpleResponses[language][normalizedQuery] || simpleResponses[language]['default'];
}

module.exports = { processQuery };