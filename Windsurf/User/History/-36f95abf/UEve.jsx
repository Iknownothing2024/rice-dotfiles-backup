import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code,
  Zap,
  Database,
  GitBranch,
  Cloud,
  Smartphone,
  Palette
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: ReactLogo,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Vue.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'TailwindCSS', level: 92 },
        { name: 'HTML5/CSS3', level: 95 }
      ]
    },
    {
      title: 'Backend',
      icon: Nodejs,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'Express.js', level: 90 },
        { name: 'Django', level: 80 },
        { name: 'REST APIs', level: 92 }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 88 },
        { name: 'MySQL', level: 82 },
        { name: 'Redis', level: 75 },
        { name: 'Prisma ORM', level: 80 }
      ]
    },
    {
      title: 'Tools & Others',
      icon: GitBranch,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 78 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 82 },
        { name: 'Agile', level: 88 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const SkillBar = ({ name, level }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Skills
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            My expertise spans across modern web technologies and development practices
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Responsive Design', 'SEO Optimization', 'Performance Tuning',
                'Unit Testing', 'Integration Testing', 'Code Review',
                'Technical Writing', 'Mentoring', 'Project Management'
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
