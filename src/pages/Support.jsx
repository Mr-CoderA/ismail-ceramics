import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Text from "../components/Text";
import QADrop from "../components/Support/QADrop";

/**
 * Custom hook to apply scroll animation using Intersection Observer.
 * @param {number} threshold - Visibility threshold for triggering animation
 * @returns {React.MutableRefObject} Reference to the animated element
 */
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("blur-animate");
          observer.unobserve(el); // Run animation only once
        }
      },
      { threshold }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [threshold]);

  return ref;
};

/**
 * OverlayContent component to display animated text and cart button.
 * @param {Object} props - Component props
 * @param {string} props.title - Title text for the animated heading
 * @param {string} props.description - Description text
 * @param {number} props.cartCount - Number of items in the cart
 * @param {Function} props.onCartClick - Cart button click handler
 * @param {string} props.className - Additional CSS classes for the container
 * @param {number} props.minHeight - Minimum height for the container (px)
 * @param {number} props.titleWidth - Width of the title container (px)
 * @param {number} props.descriptionWidth - Width of the description container (px)
 * @param {string} props.bgColor - Background color class (Tailwind)
 * @param {number} props.threshold - Intersection Observer threshold
 * @returns {JSX.Element} The rendered overlay content
 */
const OverlayContent = ({
  title = "Help your customers.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  threshold = 0.2,
}) => {
  const containerRef = useScrollAnimation(threshold);

  return (
    <div
      ref={containerRef}
      className={`w-full translate-y-[50px] opacity-100 transform max-md:min-h-[500px] min-h-[${minHeight}px] flex ${bgColor} rounded-2xl items-center justify-center ${className}`}
      role="banner"
      aria-label="Support hero section"
    >
      <div className="flex flex-col items-center">
        <p className="!px-3 w-fit !py-1 !mb-8 bg-white rounded-2xl text-sm font-semibold">
          Support
        </p>
        <h1
          className="text-6xl max-md:text-4xl font-semibold text-center"
          style={{ maxWidth: `${titleWidth}px` }}
        >
          <Text text={title} />
        </h1>
        <p
          className="!mt-8 text-lg font-medium max-md:w-[300px] text-gray-600 text-center"
          style={{ maxWidth: `${descriptionWidth}px` }}
        >
          {description}
        </p>
      </div>
      <div className="absolute left-0 w-full top-0 !m-0 flex justify-end !p-4">
        <button
          className="relative p-[8px] !mt-1 text-[25px] cursor-pointer !mr-2 md:text-black md:hidden"
          onClick={onCartClick}
          onKeyDown={(e) => e.key === "Enter" && onCartClick()}
          aria-label={`Shopping cart with ${cartCount} items`}
          tabIndex={0}
        >
          <Icon icon="fluent:cart-24-filled" width="25" height="25" />
          {cartCount > 0 && (
            <span className="absolute text-[11px] text-black w-3.5 h-3.5 flex items-center justify-center rounded-full top-[-8px] right-[-8px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * Support component to display a customer support page with FAQs and a contact form.
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.qaItems=[]] - Array of Q&A objects for QADrop
 * @param {string} [props.title='Help your customers.'] - Hero title text
 * @param {string} [props.description='Use this page to display your full product collection...'] - Hero description text
 * @param {number} [props.cartCount=3] - Number of items in the cart
 * @param {Function} [props.onCartClick=() => {}] - Cart button click handler
 * @param {string} [props.className=''] - Additional CSS classes for the container
 * @param {number} [props.minHeight=450] - Minimum height for the hero section (px)
 * @param {number} [props.titleWidth=700] - Width of the hero title container (px)
 * @param {number} [props.descriptionWidth=450] - Width of the hero description container (px)
 * @param {string} [props.bgColor='bg-purple-100'] - Hero background color class
 * @param {number} [props.contentWidth=960] - Width of the content container (px)
 * @param {string} [props.faqTitle='Frequently asked questions'] - FAQ section title
 * @param {string} [props.faqDescription='Give your visitors quick answers...'] - FAQ section description
 * @param {string} [props.contactTitle='Still got questions?'] - Contact section title
 * @param {string} [props.contactDescription='Give your visitors quick answers...'] - Contact section description
 * @param {Function} [props.onFormSubmit=() => {}] - Form submission handler
 * @param {number} [props.threshold=0.2] - Intersection Observer threshold
 * @returns {JSX.Element} The rendered support page
 */
const Support = ({
  qaItems = [
    {
      question: "How do I access my digital downloads after purchase?",
      answer:
        "Once your purchase is complete, you’ll receive an email with a download link. You can also access your downloads directly from your account page.",
    },
    {
      question: "Can I get a refund for a digital product?",
      answer:
        "Refunds for digital products are only available if the product has not been downloaded or accessed.",
    },
    {
      question: "Do digital products expire after download?",
      answer:
        "No, once downloaded, your digital products are yours to keep forever.",
    },
  ],
  title = "Help your customers.",
  description = "Use this page to display your full product collection, making it easy for customers to browse and shop.",
  cartCount = 3,
  onCartClick = () => {},
  className = "",
  minHeight = 450,
  titleWidth = 700,
  descriptionWidth = 450,
  bgColor = "bg-purple-100",
  contentWidth = 960,
  faqTitle = "Frequently asked questions",
  faqDescription = "Give your visitors quick answers to common questions about your store like these.",
  contactTitle = "Still got questions?",
  contactDescription = "Give your visitors quick answers to common questions about your store like these.",
  onFormSubmit = () => {},
  threshold = 0.2,
}) => {
  const containerRef = useScrollAnimation(threshold);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className={className} role="main" aria-label="Support page">
      <OverlayContent
        title={title}
        description={description}
        cartCount={cartCount}
        onCartClick={onCartClick}
        minHeight={minHeight}
        titleWidth={titleWidth}
        descriptionWidth={descriptionWidth}
        bgColor={bgColor}
        threshold={threshold}
      />
      <div className="w-full h-fit max-md:!p-0 max-md:!pt-20 !p-20 flex justify-center">
        <div
          className="max-md:w-full !mb-15"
          style={{ maxWidth: `${contentWidth}px` }}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5 !mb-10">
              <h1 className="text-center text-4xl font-semibold">{faqTitle}</h1>
              <p className="font-medium text-gray-500 text-lg text-center">
                <Text text={faqDescription} />
              </p>
            </div>
            <div>
              <QADrop array={qaItems} />
            </div>
          </div>
          <div
            ref={containerRef}
            className="translate-y-[50px] opacity-100 transform"
          >
            <div className="flex flex-col gap-5 !mt-10">
              <h1 className="text-center text-4xl font-semibold">
                {contactTitle}
              </h1>
              <p className="font-medium text-gray-500 text-lg text-center">
                <Text text={contactDescription} />
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative flex justify-center items-center w-full"
              aria-label="Contact support form"
            >
              <div className="w-[40rem] flex flex-col gap-8 !mt-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    placeholder="Asad Ali"
                    aria-label="Your name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    placeholder="abc@gmail.com"
                    aria-label="Your email address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-purple-100/60 !p-2 !px-3 rounded-xl outline-0"
                    placeholder="Hey, I need help with..."
                    aria-label="Your message"
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-3xl !py-3 text-lg bg-black text-white"
                  aria-label="Submit contact form"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * PropTypes for type checking and validation.
 */
Support.propTypes = {
  qaItems: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  contentWidth: PropTypes.number,
  faqTitle: PropTypes.string,
  faqDescription: PropTypes.string,
  contactTitle: PropTypes.string,
  contactDescription: PropTypes.string,
  onFormSubmit: PropTypes.func,
  threshold: PropTypes.number,
};

OverlayContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cartCount: PropTypes.number,
  onCartClick: PropTypes.func,
  className: PropTypes.string,
  minHeight: PropTypes.number,
  titleWidth: PropTypes.number,
  descriptionWidth: PropTypes.number,
  bgColor: PropTypes.string,
  threshold: PropTypes.number,
};

export default Support;
