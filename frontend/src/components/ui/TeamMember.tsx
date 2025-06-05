import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  delay?: number;
}

const TeamMember = ({
  name,
  role,
  image,
  bio,
  delay = 0,
}: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="card overflow-hidden"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6">
        <h3 className="text-xl font-medium mb-1">{name}</h3>
        <p className="text-primary-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;