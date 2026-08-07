import { notFound } from "next/navigation";
import { 
  SERVICES_DATA, 
  getServiceBySlug, 
  getRelatedServices 
} from "@/lib/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProblemSolution from "@/components/services/ServiceProblemSolution";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceWhyChooseUs from "@/components/services/ServiceWhyChooseUs";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceRelated from "@/components/services/ServiceRelated";
import ServiceCta from "@/components/services/ServiceCta";
import JsonLd from "@/components/JsonLd";

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Code with Amrendra",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [
      service.title,
      `${service.title} Services`,
      ...service.offerings.map((o) => o.title),
      "Code with Amrendra",
    ],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://codewithamrendra.in/services/${service.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://codewithamrendra.in/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.slug);

  // Schema Markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Code with Amrendra",
      "url": "https://codewithamrendra.in"
    },
    "areaServed": "Worldwide",
    "serviceType": service.title,
    "url": `https://codewithamrendra.in/services/${service.slug}`
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://codewithamrendra.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://codewithamrendra.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://codewithamrendra.in/services/${service.slug}`
      }
    ]
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* 1. Hero Section */}
      <ServiceHero service={service} />

      {/* 2. Problems & Solutions */}
      <ServiceProblemSolution 
        problems={service.problems} 
        solutions={service.solutions} 
        serviceTitle={service.title} 
      />

      {/* 3. Core Offerings */}
      <ServiceOfferings 
        offerings={service.offerings} 
        serviceTitle={service.title} 
      />

      {/* 4. Business Value & Benefits */}
      <ServiceBenefits 
        benefits={service.benefits} 
        serviceTitle={service.title} 
      />

      {/* 5. Step-by-Step Delivery Process */}
      <ServiceProcess 
        processSteps={service.process} 
      />

      {/* 6. Why Choose Code with Amrendra */}
      <ServiceWhyChooseUs />

      {/* 7. FAQs */}
      <ServiceFaq 
        faqs={service.faqs} 
        serviceTitle={service.title} 
      />

      {/* 8. Related Services & Interlinking */}
      <ServiceRelated 
        relatedServices={relatedServices} 
        relatedBlogSlugs={service.relatedBlogSlugs} 
        relatedCaseStudySlugs={service.relatedCaseStudySlugs} 
      />

      {/* 9. Final Call To Action */}
      <ServiceCta />
    </>
  );
}
