import { useSelector } from 'react-redux'
import { AppState } from '@/state'

export function useOptionDatas() {
  return {
    companySizeOpt: [
      {
        id: 1,
        size: 'All company size'
      },
      {
        id: 2,
        size: 'Seed (1 - 10 employees)'
      },
      {
        id: 3,
        size: 'Early (11 - 50 employees)'
      },
      {
        id: 4,
        size: 'Mid-size (51 - 200 employees)'
      },
      {
        id: 5,
        size: 'Large (201 - 500 employees)'
      },
      {
        id: 6,
        size: 'Very Large (501 - 1000 employees)'
      },
      {
        id: 7,
        size: 'Massive (1001+ employees)'
      }
    ],
    companyStateOpt: [
      {
        id: 1,
        state: 'pre-seed'
      },
      {
        id: 2,
        state: 'seed'
      },
      {
        id: 3,
        state: 'private'
      },
      {
        id: 4,
        state: 'public'
      },
      {
        id: 5,
        state: 'late-stage'
      }
    ],
    degreeOpt: [
      {
        id: 1,
        degree: "Associate's Degree"
      },
      {
        id: 2,
        degree: 'Bachelor of Arts (BA)'
      },
      {
        id: 3,
        degree: 'Bachelor of Business Administration (BBA)'
      },
      {
        id: 4,
        degree: 'Bachelor of Engineering (Beng)'
      },
      {
        id: 5,
        degree: 'Bachelor of Fine Arts (BFA)'
      },
      {
        id: 6,
        degree: 'Bachelor of Science (BS)'
      },
      {
        id: 7,
        degree: 'Bachelors Degree'
      },
      {
        id: 8,
        degree: 'Engineers DegreeMaster of Arts (MA)'
      },
      {
        id: 9,
        degree: 'Master of Business Administration (MBA )'
      },
      {
        id: 10,
        degree: 'Master of Fine Arts (MFA)'
      },
      {
        id: 11,
        degree: 'Master of Science (MS)'
      },
      {
        id: 12,
        degree: "Master's Degree"
      },
      {
        id: 13,
        degree: 'Doctor of Philosophy (PHD)'
      },
      {
        id: 14,
        degree: 'Doctor of Medicine (MD)'
      },
      {
        id: 15,
        degree: 'Juris Doctor (JD)'
      },
      {
        id: 16,
        degree: 'High School Diploma'
      },
      {
        id: 17,
        degree: 'Non-degree Program (e.g. Coursera certificate)'
      },
      {
        id: 18,
        degree: 'Other'
      }
    ],
    experienceYearOpt: [
      {
        id: 1,
        years: '< 1 Year'
      },
      {
        id: 2,
        years: '1 Year'
      },
      {
        id: 3,
        years: '2 Years'
      },
      {
        id: 4,
        years: '3 Years'
      },
      {
        id: 5,
        years: '4 Years'
      },
      {
        id: 6,
        years: '5 Years'
      },
      {
        id: 7,
        years: '6 Years'
      },
      {
        id: 8,
        years: '7 Years'
      },
      {
        id: 9,
        years: '8 Years'
      },
      {
        id: 10,
        years: '9 Years'
      },
      {
        id: 11,
        years: '10+ Years'
      }
    ],
    investmentTypeOpt: [
      {
        id: 1,
        investment_type: 'Equity'
      },
      {
        id: 2,
        investment_type: 'Token'
      }
    ],
    investorTypeOpt: [
      {
        id: 1,
        investorType: 'Individual Investor'
      },
      {
        id: 2,
        investorType: 'Institution Investor'
      }
    ],
    jobCareOpt: [
      {
        id: 1,
        jobCare: 'Having a say in what I work on and how I work'
      },
      {
        id: 2,
        jobCare: 'Opportunities to progress within the company'
      },
      {
        id: 3,
        jobCare: 'Team members I can learn from'
      },
      {
        id: 4,
        jobCare: 'A company with a good growth trajectory'
      },
      {
        id: 5,
        jobCare: "Having a say in the company's and/or my team's direction"
      },
      {
        id: 6,
        jobCare: 'Mentorship opportunities'
      },
      {
        id: 7,
        jobCare: 'Learn new things and develop my skills'
      },
      {
        id: 8,
        jobCare: 'Challenging problems to work on'
      },
      {
        id: 9,
        jobCare: 'A diverse team'
      }
    ],
    jobStateOpt: [
      {
        id: 1,
        state: 'Job Hunting'
      },
      {
        id: 2,
        state: 'Investment'
      },
      {
        id: 3,
        state: 'Startup'
      },
      {
        id: 4,
        state: 'Active'
      },
      {
        id: 5,
        state: 'Default'
      }
    ],
    jobTypeOpt: [
      {
        id: 1,
        jobType: 'Full-time'
      },
      {
        id: 2,
        jobType: 'Part-time'
      },
      {
        id: 3,
        jobType: 'Cofounder'
      },
      {
        id: 4,
        jobType: 'Intern'
      }
    ],
    marketTypeOpt: [
      {
        id: 1,
        marketType: 'All Categories'
      },
      {
        id: 2,
        marketType: 'Defi'
      },
      {
        id: 3,
        marketType: 'NFT'
      },
      {
        id: 4,
        marketType: 'Web3'
      },
      {
        id: 5,
        marketType: 'Gaming'
      },
      {
        id: 6,
        marketType: 'Dao'
      },
      {
        id: 7,
        marketType: 'Wallet'
      },
      {
        id: 8,
        marketType: 'Tool'
      },
      {
        id: 9,
        marketType: 'Others'
      }
    ],
    primaryRoleOpt: [
      {
        level1Name: 'Designer',
        child: [
          {
            id: 24,
            level2Name: '3D Artist'
          },
          {
            id: 25,
            level2Name: 'UI / UX Designer'
          },
          {
            id: 26,
            level2Name: 'Game Designer'
          },
          {
            id: 27,
            level2Name: 'Visual Designer'
          },
          {
            id: 28,
            level2Name: 'Graphic Designer'
          },
          {
            id: 29,
            level2Name: 'Product Designer'
          },
          {
            id: 30,
            level2Name: 'Media Operations'
          }
        ]
      },
      {
        level1Name: 'Analyics',
        child: [
          {
            id: 31,
            level2Name: 'Data Analyst'
          },
          {
            id: 32,
            level2Name: 'Business Analyst'
          },
          {
            id: 33,
            level2Name: 'Blockchain Researcher'
          }
        ]
      },
      {
        level1Name: 'Operations',
        child: [
          {
            id: 34,
            level2Name: 'Head of Finance'
          },
          {
            id: 35,
            level2Name: 'Finance / Accounting.'
          },
          {
            id: 36,
            level2Name: 'Recruiter'
          },
          {
            id: 37,
            level2Name: 'Customer Service'
          },
          {
            id: 38,
            level2Name: 'Operations Manager'
          },
          {
            id: 39,
            level2Name: 'Business Development'
          },
          {
            id: 40,
            level2Name: 'Customer Success Manager'
          }
        ]
      },
      {
        level1Name: 'Marketing',
        child: [
          {
            id: 41,
            level2Name: 'Head of Marketing'
          },
          {
            id: 42,
            level2Name: 'Marketing Manager'
          },
          {
            id: 43,
            level2Name: 'Marketing Associate'
          },
          {
            id: 44,
            level2Name: 'Social Media Manager'
          },
          {
            id: 45,
            level2Name: 'Community Manager'
          },
          {
            id: 46,
            level2Name: 'Growth & Partnerships'
          },
          {
            id: 47,
            level2Name: 'Content Creator'
          },
          {
            id: 48,
            level2Name: 'SEO Manager'
          }
        ]
      },
      {
        level1Name: 'Management',
        child: [
          {
            id: 1,
            level2Name: 'Founder'
          },
          {
            id: 2,
            level2Name: 'CoFounder'
          },
          {
            id: 3,
            level2Name: 'CEO'
          },
          {
            id: 4,
            level2Name: 'CFO'
          },
          {
            id: 5,
            level2Name: 'CMO'
          },
          {
            id: 6,
            level2Name: 'COO'
          },
          {
            id: 7,
            level2Name: 'CTO'
          },
          {
            id: 8,
            level2Name: 'Product Manager'
          }
        ]
      },
      {
        level1Name: 'Engineering',
        child: [
          {
            id: 9,
            level2Name: 'Engineering Manager'
          },
          {
            id: 10,
            level2Name: 'Software Engineer'
          },
          {
            id: 11,
            level2Name: 'Smart Contract Engineer'
          },
          {
            id: 12,
            level2Name: 'Frontend Engineer'
          },
          {
            id: 13,
            level2Name: 'Backend Engineer'
          },
          {
            id: 14,
            level2Name: 'Mobile Engineer'
          },
          {
            id: 15,
            level2Name: 'Android Engineer'
          },
          {
            id: 16,
            level2Name: 'IOS Engineer'
          },
          {
            id: 17,
            level2Name: 'Security Engineer'
          },
          {
            id: 18,
            level2Name: 'Full Stack Engineer'
          },
          {
            id: 19,
            level2Name: 'Data Engineer'
          },
          {
            id: 20,
            level2Name: 'QA Engineer'
          },
          {
            id: 21,
            level2Name: 'Devops Engineer'
          },
          {
            id: 22,
            level2Name: 'Embedded Engineer'
          },
          {
            id: 23,
            level2Name: 'Machine Learning Engineer'
          }
        ]
      }
    ],
    publicRoleOpt: [
      {
        id: 1,
        role: 'Individual Investor'
      },
      {
        id: 2,
        role: 'Defi Player'
      },
      {
        id: 3,
        role: 'Freelancer'
      },
      {
        id: 4,
        role: 'Job Opportunist'
      },
      {
        id: 5,
        role: 'Founder'
      }
    ],
    serviceCategoryOpt: [
      {
        id: 1,
        category: 'Contract Developer'
      },
      {
        id: 2,
        category: 'Web Programming'
      },
      {
        id: 3,
        category: 'Mobile App Programming'
      },
      {
        id: 4,
        category: 'Data Processing'
      },
      {
        id: 5,
        category: 'Product Management'
      },
      {
        id: 6,
        category: 'Metaverse & GameFi'
      },
      {
        id: 7,
        category: 'UI/UX Design'
      },
      {
        id: 8,
        category: 'Visual Design & 3D Modeling'
      },
      {
        id: 9,
        category: 'Collaboration'
      },
      {
        id: 10,
        category: 'Marketing'
      }
    ],
    chainInfoOpt: [
      {
        id: 1,
        chainName: 'Ethereum Chain',
        shortName: 'ETH',
        chainType: 1,
        ethChainId: 1,
        network_id: 'ethereum'
      },
      {
        id: 2,
        chainName: 'BNB Chain',
        shortName: 'BSC',
        chainType: 1,
        ethChainId: 56,
        network_id: 'binance-smart-chain'
      },
      {
        id: 4,
        chainName: 'Arbitrum One',
        shortName: 'ARBI',
        chainType: 1,
        ethChainId: 42161,
        network_id: 'arbitrum-one'
      },
      {
        id: 6,
        chainName: 'Polygon',
        shortName: 'polygon',
        chainType: 1,
        ethChainId: 137,
        network_id: 'polygon-pos'
      },
      {
        id: 8,
        chainName: 'Optimism',
        shortName: 'op',
        chainType: 1,
        ethChainId: 10,
        network_id: 'optimistic-ethereum'
      },
      {
        id: 9,
        chainName: 'Avalanche',
        shortName: 'aval',
        chainType: 1,
        ethChainId: 43114,
        network_id: 'avalanche'
      },
      {
        id: 10,
        chainName: 'OKEXChain',
        shortName: 'okex',
        chainType: 1,
        ethChainId: 66,
        network_id: 'okex-chain'
      },
      {
        id: 11,
        chainName: 'Moonriver',
        shortName: 'mriver',
        chainType: 1,
        ethChainId: 1285,
        network_id: 'moonriver'
      },
      {
        id: 12,
        chainName: 'Aurora',
        shortName: 'aurora',
        chainType: 1,
        ethChainId: 1313161554,
        network_id: 'aurora'
      },
      {
        id: 13,
        chainName: 'Fantom',
        shortName: 'fantom',
        chainType: 1,
        ethChainId: 250,
        network_id: 'fantom'
      },
      {
        id: 15,
        chainName: 'Kava',
        shortName: 'kava',
        chainType: 1,
        ethChainId: 2222,
        network_id: 'kava'
      },
      {
        id: 16,
        chainName: 'Celo',
        shortName: 'celo',
        chainType: 1,
        ethChainId: 42220,
        network_id: 'celo'
      },
      {
        id: 17,
        chainName: 'Gnosis Chain',
        shortName: 'gnosis',
        chainType: 1,
        ethChainId: 100,
        network_id: 'xdai'
      },
      {
        id: 19,
        chainName: 'Dogechain',
        shortName: 'doge',
        chainType: 1,
        ethChainId: 2000,
        network_id: 'dogechain'
      },
      {
        id: 22,
        chainName: 'Moonbeam',
        shortName: 'mbeam',
        chainType: 1,
        ethChainId: 1284,
        network_id: 'moonbeam'
      },
      {
        id: 23,
        chainName: 'Klaytn',
        shortName: 'klay',
        chainType: 1,
        ethChainId: 8217,
        network_id: 'klay-token'
      },
      {
        id: 24,
        chainName: 'Polygon zkEVM',
        shortName: 'polygonzk',
        chainType: 1,
        ethChainId: 1101,
        network_id: 'zkevm'
      },
      {
        id: 25,
        chainName: 'Zksync Era',
        shortName: 'zksyncera',
        chainType: 1,
        ethChainId: 324,
        network_id: 'zksync'
      },
      {
        id: 28,
        chainName: 'Rollux',
        shortName: 'Rollux',
        chainType: 1,
        ethChainId: 570,
        network_id: 'rollux'
      }
    ],
    tokenTypeOpt: [
      {
        id: 1,
        name: 'ERC20'
      },
      {
        id: 2,
        name: 'ERC721'
      },
      {
        id: 3,
        name: 'ERC1155'
      }
    ]
  }
  // const configOptions = useSelector<AppState, AppState['configOptions']>(state => state.configOptions)
  // return configOptions.optionDatas
}
