/**
 * The Axis Promise (3 P's update, approved by the owner 2026-11-02): one brand line in three
 * beats, seven commitments, each with the proof that already exists, and the proof Axis will
 * publish once it has the figures.
 */
import { company } from '@data/company';
import { stateList } from '@lib/format';

/**
 * The three beats of the promise line, shown on separate lines in the home page headline. The
 * owner asked for another way to say "Kept producing" (2026-11-02); "Performing for years." is
 * the proposed replacement, pending Ross's pick.
 */
export const promiseBeats = ['Built right.', 'Energized on schedule.', 'Performing for years.'];
export const promiseLine = promiseBeats.join(' ');

export interface Commitment {
  icon: string;
  title: string;
  body: string;
  proof: string;
  link?: { label: string; href: string };
}

const omArea = stateList(company.omStates);

export const commitments: Commitment[] = [
  {
    icon: 'lucide:user-check',
    title: 'One accountable team',
    body: 'A named project manager and superintendent stay with your project from notice to proceed through turnover, and you get their direct line.',
    proof: 'An experienced Axis superintendent is on every site today.',
  },
  {
    icon: 'lucide:calendar-check',
    title: 'No surprises',
    body: 'A weekly look-ahead schedule and photo report on every project, and change orders priced and approved before the work, not after.',
    proof:
      'Hertford Solar: documented execution controls carried a stalled project to commissioning.',
    link: { label: 'Hertford Solar', href: '/project/hertford-solar/' },
  },
  {
    icon: 'lucide:zap',
    title: 'We own energization',
    body: 'Medium-voltage work, the point of interconnection, cable testing and commissioning are led by our own electrical team, so there is no hand-off at the step where projects most often stall.',
    proof: 'Electrical roots back to 1910, with VLF / Tan Delta cable testing in house.',
    link: {
      label: 'Electrical infrastructure',
      href: '/services/electrical-infrastructure-and-commissioning/',
    },
  },
  {
    icon: 'lucide:shield-check',
    title: 'Backed and bonded',
    body: 'Payment and performance bonding, procurement and resources backed by 1910 Legacy Enterprises.',
    proof: 'Part of 1910 Legacy Enterprises, building across the Southeast since 1910.',
  },
  {
    icon: 'lucide:folder-check',
    title: 'Documented turnover',
    body: 'As-built drawings, test and commissioning reports, and an infrared baseline of the array at handover, so operations start from facts.',
    proof:
      'Solar 55: forensic assessment, testing and performance verification restored a neglected 2.0 MWac plant.',
    link: { label: 'Solar 55', href: '/project/mount-olive-asset-recovery/' },
  },
  {
    icon: 'lucide:timer',
    title: 'A response within 24 hours',
    body: `Tell us about a plant you own, or a problem with one, and we respond ${company.responseTime}, anywhere we provide O&M: ${omArea}.`,
    proof: 'Corrective maintenance and rapid response are part of every Axis O&M agreement.',
    link: { label: 'O&M services', href: '/om-and-technical-services/#corrective-maintenance' },
  },
  {
    icon: 'lucide:flag',
    title: 'We finish what we start, and what others started',
    body: 'If your contractor walks away, we step in, restore compliance and carry the project to energization.',
    proof: 'Hertford Solar: taken over at clearing and grading, delivered through interconnection.',
    link: { label: 'Project Rescue', href: '/services/project-rescue/' },
  },
];

export interface ProofPoint {
  label: string;
  icon: string;
  /** The published figure. Points without one are left out of production builds. */
  value?: string;
  /** Who supplies the figure. */
  source: string;
}

/**
 * Proof to publish under By the numbers once the figures arrive. Safety rates are 1910 Legacy
 * Enterprises' consolidated figures, not Axis's own (owner, 2026-11-02: one injury at Axis's
 * headcount and hours would put its TRIR far out of line).
 */
export const proofPoints: ProofPoint[] = [
  {
    label: 'EMR, three-year average · 1910 Legacy Enterprises, consolidated',
    icon: 'lucide:hard-hat',
    source: 'Josh Butler / 1910 Legacy Safety',
  },
  {
    label: 'TRIR · 1910 Legacy Enterprises, consolidated',
    icon: 'lucide:activity',
    source: 'Josh Butler / 1910 Legacy Safety',
  },
  {
    label: 'Projects energized on the contract schedule',
    icon: 'lucide:calendar-check',
    source: 'Josh Butler',
  },
  { label: 'Repeat clients', icon: 'lucide:repeat', source: 'Josh Butler' },
];
