import { createContext, useState, useContext } from 'react';

export const cityKeys = ['riyadh', 'jeddah', 'dammam', 'khobar', 'mecca', 'medina', 'abha', 'taif', 'tabuk', 'hail', 'jubail', 'najran'];

const translations = {
  en: {
    nav: { myTickets: 'My Tickets', createEvent: 'Create Event', becomeOrganizer: 'Become Organizer', admin: 'Admin', login: 'Login', register: 'Register', logout: 'Logout' },
    home: { heroTitle: 'Now Showing: Events Worth The Trip', heroSubtitle: 'Box Office Open — Book Below', loading: 'Loading events...', empty: 'No events yet.', error: 'Failed to load events' },
    event: { bookTicket: 'Book This Ticket', soldOut: 'Sold Out', loginToBook: 'Login to book', spotsLeft: 'LEFT', loc: 'LOC', date: 'DATE', bookedSuccess: 'Ticket booked successfully! 🎉' },
    login: { boxOffice: 'Box Office', title: 'Sign In', email: 'Email', password: 'Password', submit: 'Enter', noAccount: 'No account yet?', registerLink: 'Register' },
    register: { boxOffice: 'Box Office', title: 'Create Account', fullName: 'Full Name', email: 'Email', password: 'Password', accountType: 'Account Type', attendee: 'Attendee', organizer: 'Organizer', submit: 'Register', haveAccount: 'Already have an account?', loginLink: 'Login' },
    myTickets: { willCall: 'Will Call', title: 'My Tickets', backToEvents: '← Back to Events', loading: 'Loading tickets...', empty: "No tickets booked yet.", code: 'CODE' },
    createEvent: { organizerDesk: 'Organizer Desk', title: 'Create Event', onlyOrganizers: 'Event creation is available to organizers only.', backToHome: '← Back to Home', eventTitle: 'Event Title', description: 'Description', category: 'Category', location: 'Location', date: 'Date', price: 'Price (SAR)', capacity: 'Total Capacity', submit: 'Publish Event' },
    becomeOrganizer: {
      backstage: 'Backstage Access', title: 'Become an Organizer',
      alreadyOrganizer: 'Organizer access already granted.', goToCreate: 'Go to Create Event',
      pending: 'Request pending review by an admin.',
      rejected: 'Previous request was not approved. A new request can be submitted below.',
      orgName: 'Organization Name', phone: 'Contact Phone', submit: 'Submit Request',
      success: 'Request submitted and pending review.',
    },
    admin: {
      panel: 'Admin Panel', title: 'Organizer Requests', adminsOnly: 'Admins only.', backToHome: '← Back to Home',
      loading: 'Loading...', empty: 'No pending requests.',
      org: 'Org', phone: 'Phone', approve: 'Approve', reject: 'Reject',
    },
    cities: { riyadh: 'Riyadh', jeddah: 'Jeddah', dammam: 'Dammam', khobar: 'Khobar', mecca: 'Mecca', medina: 'Medina', abha: 'Abha', taif: 'Taif', tabuk: 'Tabuk', hail: 'Hail', jubail: 'Jubail', najran: 'Najran' },
  },
  ar: {
    nav: { myTickets: 'تذاكري', createEvent: 'إنشاء فعالية', becomeOrganizer: 'الانضمام كمنظّم', admin: 'لوحة الإدارة', login: 'تسجيل الدخول', register: 'حساب جديد', logout: 'تسجيل الخروج' },
    home: { heroTitle: 'يُعرض الآن: فعاليات تستاهل الحضور', heroSubtitle: 'شباك التذاكر مفتوح — الحجز بالأسفل', loading: 'جارٍ تحميل الفعاليات...', empty: 'لا توجد فعاليات بعد.', error: 'تعذر تحميل الفعاليات' },
    event: { bookTicket: 'حجز التذكرة', soldOut: 'نفدت التذاكر', loginToBook: 'يلزم تسجيل الدخول للحجز', spotsLeft: 'متبقي', loc: 'الموقع', date: 'التاريخ', bookedSuccess: 'تم حجز التذكرة بنجاح! 🎉' },
    login: { boxOffice: 'شباك التذاكر', title: 'تسجيل الدخول', email: 'البريد الإلكتروني', password: 'كلمة المرور', submit: 'دخول', noAccount: 'لا يوجد حساب؟', registerLink: 'إنشاء حساب' },
    register: { boxOffice: 'شباك التذاكر', title: 'إنشاء حساب', fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', password: 'كلمة المرور', accountType: 'نوع الحساب', attendee: 'حاضر', organizer: 'منظّم', submit: 'إنشاء الحساب', haveAccount: 'يوجد حساب مسبقًا؟', loginLink: 'تسجيل الدخول' },
    myTickets: { willCall: 'استلام التذاكر', title: 'تذاكري', backToEvents: '→ رجوع للفعاليات', loading: 'جارٍ تحميل التذاكر...', empty: 'لم يتم حجز أي تذكرة بعد.', code: 'الرمز' },
    createEvent: { organizerDesk: 'مكتب المنظّم', title: 'إنشاء فعالية', onlyOrganizers: 'إنشاء الفعاليات متاح للمنظمين فقط.', backToHome: '→ رجوع للرئيسية', eventTitle: 'عنوان الفعالية', description: 'الوصف', category: 'الفئة', location: 'الموقع', date: 'التاريخ', price: 'السعر (ريال)', capacity: 'السعة الكلية', submit: 'نشر الفعالية' },
    becomeOrganizer: {
      backstage: 'دخول خلف الكواليس', title: 'الانضمام كمنظّم',
      alreadyOrganizer: 'صلاحية المنظّم مفعّلة مسبقًا.', goToCreate: 'الذهاب لإنشاء فعالية',
      pending: 'الطلب قيد المراجعة من الإدارة.',
      rejected: 'الطلب السابق لم تتم الموافقة عليه. يمكن تقديم طلب جديد بالأسفل.',
      orgName: 'اسم الجهة', phone: 'رقم التواصل', submit: 'إرسال الطلب',
      success: 'تم إرسال الطلب وهو قيد المراجعة.',
    },
    admin: {
      panel: 'لوحة الإدارة', title: 'طلبات الانضمام كمنظّم', adminsOnly: 'الوصول للإدارة فقط.', backToHome: '→ رجوع للرئيسية',
      loading: 'جارٍ التحميل...', empty: 'لا توجد طلبات معلّقة.',
      org: 'الجهة', phone: 'الهاتف', approve: 'موافقة', reject: 'رفض',
    },
    cities: { riyadh: 'الرياض', jeddah: 'جدة', dammam: 'الدمام', khobar: 'الخبر', mecca: 'مكة المكرمة', medina: 'المدينة المنورة', abha: 'أبها', taif: 'الطائف', tabuk: 'تبوك', hail: 'حائل', jubail: 'الجبيل', najran: 'نجران' },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang], dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
