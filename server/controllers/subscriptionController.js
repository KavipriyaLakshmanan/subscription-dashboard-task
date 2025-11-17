const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

exports.subscribe = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    // Create subscription
    const subscription = new Subscription({
      user_id: userId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      status: 'active'
    });

    await subscription.save();

    // Populate the subscription with plan details
    await subscription.populate('plan_id');

    res.status(201).json({
      message: 'Subscription created successfully',
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMySubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ 
      user_id: userId, 
      status: 'active',
      end_date: { $gte: new Date() }
    }).populate('plan_id');

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};