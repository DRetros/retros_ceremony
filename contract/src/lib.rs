use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use serde::Serialize;
use near_sdk::{env, near_bindgen, AccountId};

use uuid::Uuid;

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Retro {
    records: LookupMap<AccountId, RetroDetails>,
}

#[derive(Serialize, BorshDeserialize, BorshSerialize)]
pub struct RetroDetails {
    retro_id: String,
    description: String,
}

impl Default for Retro {
    fn default() -> Self {
        Self {
            records: LookupMap::new(b"r".to_vec()),
        }
    }
}

#[near_bindgen]
impl Retro {
    pub fn create_retro(&mut self, description: String) {
        let account_id = env::signer_account_id();
        let retro_id = Uuid::new_v4().to_string();
        let r = RetroDetails {
            retro_id,
            description,
        };
        self.records.insert(&account_id, &r);
    }

    pub fn get_retro(&self, account_id: AccountId) -> Option<RetroDetails> {
        return self.records.get(&account_id);
    }
}


#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn create_then_get_retro() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Retro::default();
        contract.create_retro("Feedback required".to_string());
        contract.get_retro("bob_near".to_string());
    }
}
